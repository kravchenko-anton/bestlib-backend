import { HttpStatus, Injectable } from '@nestjs/common';

import { JSDOM } from 'jsdom';
import { slugify } from '@/src/utils/helpers/slugify';
import { convertToRoman } from '@/src/book/helpers/romanize-number';
import { calculateReadingTime } from '@/src/book/helpers/calculateReadingTime';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { serverError } from '@/src/utils/helpers/server-error';
import { getChapterStructure } from '@/src/ebook/helpers/chapter-structure';
import { getHtmlStructure } from '@/src/ebook/helpers/get-html-structure';
import { ebookProcessing } from '@/src/ebook/helpers/unfold/unfold-ebook';
import { UpdateChapterDto } from 'src/ebook/ebook.dto';

@Injectable()
export class EbookService {
	constructor(private readonly prisma: PrismaService) {}

	async updateChapter(chapterId: string, dto: UpdateChapterDto) {
		console.log('start updating chapter:', chapterId, dto);
		const chapter = await this.prisma.chapter.findUnique({
			where: { id: chapterId },
			select: {
				bookId: true
			}
		});
		console.log('chapter:', chapter, chapterId);
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
				content: true
			},
			orderBy: {
				position: 'asc'
			}
		});
	}
	async ebookById(bookId: string) {
		//TODO: сделать получение твоих цытат и сразу проверку на существование + gold цытаты
		console.log("start getting ebook's content by id:", bookId);
		const book = await this.prisma.book.findUnique({
			where: { id: bookId },
			select: {
				id: true,
				title: true,
				chapters: {
					select: {
						title: true,
						position: true,
						content: true,
						id: true
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
		const ebook = book.chapters.map(({ content, position, title, id }) =>
			getChapterStructure({
				title,
				id,
				sectionId: `${slugify(title)}_${id}`,
				content,
				readingTime: calculateReadingTime(content),
				romanNumber: convertToRoman(position)
			})
		);

		const dom = new JSDOM(ebook.join(''));
		console.log('start with jsdom');

		const file = dom.window.document.documentElement.outerHTML.toString();
		console.log('return result', book.title);
		return {
			...book,
			file: getHtmlStructure(file, book.picture, book.title),
			chapters: book.chapters.map(({ id, title }) => ({
				title,
				link: `${slugify(title)}_${id}`
			}))
		};
	}

	async unfold(file: Express.Multer.File) {
		console.log('start unfolding book');
		if (!file.buffer && file.mimetype !== 'application/epub+zip')
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid file');
		return ebookProcessing(file.buffer);
	}
}
