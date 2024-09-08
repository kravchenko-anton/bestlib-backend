import { HttpStatus, Injectable } from '@nestjs/common';

import { JSDOM } from 'jsdom';
import { slugify } from '@/src/utils/helpers/slugify';
import { getFileUrl } from '@/src/utils/common/get-file-url';
import { convertToRoman } from '@/src/book/helpers/romanize-number';
import { calculateReadingTime } from '@/src/book/helpers/calculateReadingTime';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { serverError } from '@/src/utils/helpers/server-error';
import { getChapterStructure } from '@/src/ebook/helpers/chapter-structure';
import { getHtmlStructure } from '@/src/ebook/helpers/get-html-structure';
import { ebookProcessing } from '@/src/ebook/helpers/unfold/unfold-ebook';

@Injectable()
export class EbookService {
	constructor(private readonly prisma: PrismaService) {}

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
		console.log('get ebook content:', ebook.slice(0, 20));

		const dom = new JSDOM(ebook.join(''));
		console.log('start with jsdom');
		const images = dom.window.document.querySelectorAll('img');
		console.log('get images:', images.length);
		for (const image of images) {
			const sourcePath = image.getAttribute('src');
			if (sourcePath) {
				console.log('set image src with path', sourcePath);
				image.src = getFileUrl(sourcePath);
			} else {
				console.log('remove image');
				image.remove();
			}
		}

		const file = dom.window.document.documentElement.outerHTML.toString();
		console.log('get file:', file.slice(0, 20));
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
