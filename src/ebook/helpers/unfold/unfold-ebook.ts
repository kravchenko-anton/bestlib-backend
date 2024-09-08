import { HttpStatus } from '@nestjs/common';
import EPub from 'epub2';
import { imageProcessing } from './image-processing';
import type { UnfoldChapter, UnfoldOutput } from '@/src/ebook/dto/ebook.dto';
import { prettifyHtmlContent } from '@/src/ebook/helpers/unfold/html-tree-processing';
import { serverError } from '@/src/utils/helpers/server-error';

export const ebookProcessing = async (buffer: Buffer) =>
	new Promise(resolve => {
		const epub = new EPub(
			buffer as unknown as string,
			'/images/',
			'/chapters/'
		);
		epub.on('end', function () {
			const images = epub.listImage();
			console.log("get image list from unfold's epub:", images.length);
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

			const flow = epub.flow.map(
				(chapter, index) =>
					new Promise<UnfoldChapter | null>(resolve => {
						try {
							if (!chapter.id) return;
							epub.getChapter(chapter.id, async (error, text) => {
								if (error) return null;
								if (!text) return null;
								const finalContent = await prettifyHtmlContent(text);
								resolve({
									id: (index + 1).toString(),
									title: String(chapter.title),
									content: finalContent
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
				.then(chapters => {
					const validChapters = chapters.filter(
						chapter => chapter?.content !== null
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
						name: chapter?.title || '',
						text: imageProcessing(chapter?.content || '', imgData)
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
	});
