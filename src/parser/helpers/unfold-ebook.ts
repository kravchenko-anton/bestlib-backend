import type { UnfoldOutput } from '@/src/parser/dto/parser.dto';
import prettify from '@liquify/prettify';
import { HttpStatus } from '@nestjs/common';
import EPub from 'epub2';
import { JSDOM } from 'jsdom';
import { serverError } from '../../utils/helpers/server-error';
import { BaseChapter } from '@/src/book/ebook/dto/ebook.dto';

const textTags = new Set(['A', 'H2', 'H1', 'H3', 'H4', 'H5', 'H6', 'P']);
const removedTags = new Set([
	'svg',
	'iframe',
	'script',
	'style',
	'table',
	'TABLE',
	'SUP',
	'SUB',
	'hr',
	'HR'
]);
export const clearHtmlElement = (element: Element): Element => {
	console.log(element.tagName, 'element.tagName');
	const attributes = element.getAttributeNames();
	for (const attribute of attributes) {
		if (attribute === 'src') continue;
		element.removeAttribute(attribute);
	}

	if (textTags.has(element.tagName) && element.textContent === '')
		element.remove();
	if (removedTags.has(element.tagName)) element.remove();
	return element;
};

export const updatedContent = async (text: string) => {
	const dom = new JSDOM(String(text));

	const clearElements = dom.window.document.querySelectorAll('*');
	const elements = [...clearElements].map(element => clearHtmlElement(element));
	for (const element of elements) {
		if (
			(element.tagName === 'a' ||
				element.tagName === 'A' ||
				element.tagName === 'p' ||
				element.tagName === 'P') &&
			element.childElementCount > 1
		) {
			const div = dom.window.document.createElement('div');
			div.innerHTML = element.innerHTML;
			element.replaceWith(div);
		}
	}
	if (!prettify.format) {
		throw serverError(
			HttpStatus.BAD_REQUEST,
			"Some components aren't available"
		);
	}
	return prettify
		.format(dom.window.document.body?.innerHTML || '', {
			language: 'html',
			indentSize: 2,
			endNewline: true
		})
		.then((formatted: string) => formatted);
};

const insertIdToImages = (
	text: string,
	imagesData: {
		id: string;
		href: string;
		data: Buffer;
	}[]
) => {
	const dom = new JSDOM(text);
	const images = dom.window.document.querySelectorAll('img');
	for (const img of images) {
		const imgData = imagesData.find(data => '/images/' + data.href === img.src);

		if (!imgData) {
			console.log(imagesData, 'no imgData');
			img.remove();
		}
		if (imgData?.id.startsWith('cover')) {
			console.log('cover');
			img.remove();
		}

		console.log(imgData, 'imgData');
		img.setAttribute('id', imgData?.id || '');
		img.setAttribute('alt', img.src);
		img.removeAttribute('src');
	}
	return dom.window.document.body?.innerHTML || '';
};

export const getEbook = async (buffer: Buffer) =>
	new Promise(resolve => {
		const epub = new EPub(
			buffer as unknown as string,
			'/images/',
			'/chapters/'
		);
		epub.on('end', function () {
			const images = epub.listImage();
			const finalAnswer: UnfoldOutput = {
				images: [],
				chapters: []
			};
			const imgData: {
				id: string;
				href: string;
				mimeType: string;
				data: Buffer;
			}[] = [];
			for (const img of images) {
				if (!img.id) return;
				epub.getImage(img.id, (_, data) => {
					if (!data) return null;
					return imgData.push({
						id: img.id || '',
						href: img.href || '',
						data: data,
						mimeType: img.mediaType || 'image/jpeg'
					});
				});
			}

			const flow: Promise<BaseChapter | null>[] = epub.flow.map(
				(chapter, index) =>
					new Promise<BaseChapter | null>(resolve => {
						try {
							if (!chapter.id) return;
							epub.getChapter(chapter.id, async (error, text) => {
								if (error) return null;
								if (!text) return null;
								const finalContent = await updatedContent(text);
								resolve({
									id: (index + 1).toString(),
									name: String(chapter.title),
									text: finalContent
								});
								return null;
							});
						} catch {
							throw serverError(
								HttpStatus.BAD_REQUEST,
								'Error while parsing chapters'
							);
						}
					})
			);
			Promise.all(flow)
				.then((chapters: (BaseChapter | null)[]) => {
					const validChapters = chapters.filter(
						chapter => chapter?.text !== null
					);
					finalAnswer.images = imgData.map(img => ({
						id: img.id,
						href: img.href,
						mimeType: img.mimeType,
						data: img.data.toString('base64')
					}));
					console.log(imgData, 'imgData before');
					finalAnswer.chapters = validChapters.map((chapter, index) => ({
						id: String(index + 1),
						name: chapter?.name || '',
						text: insertIdToImages(chapter?.text || '', imgData)
					}));
					resolve({
						images: finalAnswer.images.filter(img => img.id !== 'cover'),
						chapters: finalAnswer.chapters
					}); // Resolve the promise with the finalAnswer object
				})
				.catch(() =>
					serverError(HttpStatus.BAD_REQUEST, 'Error while parsing chapters')
				);
		});
		epub.parse();
	}) as unknown as UnfoldOutput;
