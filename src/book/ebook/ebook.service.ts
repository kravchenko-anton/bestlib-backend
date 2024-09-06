import { wrapEbookInLogic } from '@/src/book/ebook/helpers/wrapEbookInLogic';
import { HttpStatus, Injectable } from '@nestjs/common';

import { JSDOM } from 'jsdom';
import { z } from 'zod';
import { serverError } from '../../utils/helpers/server-error';
import { PrismaService } from '../../utils/services/prisma.service';
import type { StoredEBook } from './dto/ebook.dto';
import { StoredEBookSchema } from '@/src/book/ebook/dto/ebook.schema';
import { slugify } from '@/src/utils/helpers/slugify';
import { getFileUrl } from '@/src/utils/common/get-file-url';
import { getServerBookHtml } from '@/src/book/ebook/helpers/getBookHtml';

@Injectable()
export class EbookService {
	constructor(private readonly prisma: PrismaService) {}
	async storedEbookById(id: string) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				ebook: true
			}
		});
		if (!book) {
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		}
		const ebook: StoredEBook[] = await fetch(getFileUrl(book.ebook))
			.then(result => result.json())
			.catch(() => null);
		if (!ebook) {
			console.log('error', 'not found ebook' + book.title + book.id);
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		}
		const errors = z.array(StoredEBookSchema).safeParse(ebook);
		if (!errors.success) {
			console.log('error', 'not valid ebook' + book.title, errors.error);
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		}

		return ebook;
	}

	async ebookById(id: string) {
		//TODO: сделать получение твоих цытат и сразу проверку на существование + gold цытаты
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				ebook: true,
				picture: true
			}
		});
		if (!book) {
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		}
		const ebook = await this.storedEbookById(id);
		const ebookString = ebook
			.map(({ chapters, title }) =>
				chapters
					.map(({ text, name, romanNumber, readingTime, id }) =>
						getServerBookHtml({
							name,
							id,
							sectionId: `${slugify(name + ' ' + title)}_${id}`,
							text,
							readingTime,
							romanNumber
						})
					)
					.join(' ')
			)
			.join(' ');

		const dom = new JSDOM(ebookString);
		const images = dom.window.document.querySelectorAll('img');
		for (const image of images) {
			const sourcePath = image.getAttribute('src');
			if (sourcePath) {
				image.src = getFileUrl(sourcePath);
			} else {
				image.remove();
			}
		}

		const file = dom.window.document.documentElement.outerHTML.toString();

		return {
			...book,
			file: wrapEbookInLogic(file, book.picture, book.title),
			chapters: ebook.map(({ title, chapters }) => ({
				title,
				children: chapters.map(({ name, id }) => ({
					name,
					link: `${slugify(name + ' ' + title)}_${id}`
				}))
			}))
		};
	}
}
