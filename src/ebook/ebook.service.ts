import { calculateReadingTime } from '@/src/book/helpers/calculateReadingTime';
import { convertToRoman } from '@/src/book/helpers/romanize-number';
import { getChapterStructure } from '@/src/ebook/helpers/chapter-structure';
import {
	getHtmlStructure,
	onLoadScript
} from '@/src/ebook/helpers/get-html-structure';
import { ebookProcessing } from '@/src/ebook/helpers/unfold/unfold-ebook';
import { serverError } from '@/src/utils/helpers/server-error';
import { slugify } from '@/src/utils/helpers/slugify';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import { JSDOM } from 'jsdom';
import { EbookOutput, UpdateChapterDto } from 'src/ebook/ebook.dto';

@Injectable()
export class EbookService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}

	async updateChapter(chapterId: string, dto: UpdateChapterDto) {
		console.log('start updating chapter:', chapterId, dto);
		const chapter = await this.prisma.chapter.findUnique({
			where: { id: chapterId },
			select: {
				bookId: true
			}
		});
		console.log('chapter:', chapter, chapterId);
		if (!chapter)
			throw serverError(HttpStatus.BAD_REQUEST, 'Chapter not found');
		await this.prisma.chapter.update({
			where: { id: chapterId, bookId: chapter.bookId },
			data: dto
		});
	}
	async adminEbookById(bookId: string) {
		return this.prisma.chapter.findMany({
			where: { bookId },
			select: {
				id: true,
				title: true,
				position: true,
				content: true,
				wordCount: true,
				symbolCount: true
			},
			orderBy: {
				position: 'asc'
			}
		});
	}
	async ebookById(bookId: string) {
		console.log("start getting ebook's content by id:", bookId);

		const cachedEbook = await this.cacheManager.get(`ebook_answer_${bookId}`);
		if (cachedEbook) {
			console.log('Returning cached ebook:', bookId);
			return cachedEbook as EbookOutput;
		}
		const book = await this.prisma.book.findUnique({
			where: { id: bookId },
			select: {
				id: true,
				title: true,
				author: {
					select: {
						name: true,
						id: true
					}
				},
				chapters: {
					select: {
						title: true,
						position: true,
						content: true,
						id: true,
						wordCount: true
					},
					orderBy: {
						position: 'asc'
					}
				},
				picture: true
			}
		});

		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");

		console.log('get ebookById:', book.title);

		const ebook = book.chapters.map(
			({ content, position, title, id, wordCount }) =>
				getChapterStructure({
					title,
					id,
					sectionId: `${slugify(title)}_${id}`,
					content,
					readingTimeMin: calculateReadingTime(wordCount),
					romanNumber: convertToRoman(position)
				})
		);

		const dom = new JSDOM(ebook.join(''));
		const file = dom.window.document.body.innerHTML.toString();

		console.log('return result', book.title);

		const ebookResult = {
			...book,
			onLoadScript: onLoadScript,
			file: getHtmlStructure(file, book.picture, book.title),
			functionEnums: {
				scrollToProgress: 'scrollToProgress',
				scrollToChapter: 'scrollToChapter',
				removeAllTextSelection: 'removeAllTextSelection',
				wrapReactionsInMarkTag: 'wrapReactionsInMarkTag'
			},
			chapters: book.chapters.map(({ id, title }) => ({
				title,
				link: `${slugify(title)}_${id}`
			}))
		};

		await this.cacheManager.set(
			`ebook_answer_${bookId}`,
			ebookResult,
			60 * 60 * 2
		);

		return ebookResult;
	}

	async unfold(file: Express.Multer.File) {
		console.log('start unfolding book');
		if (!file.buffer && file.mimetype !== 'application/epub+zip')
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid file');
		return ebookProcessing(file.buffer);
	}
}
