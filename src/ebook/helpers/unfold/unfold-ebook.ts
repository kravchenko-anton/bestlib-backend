import { HttpStatus } from '@nestjs/common';
import EPub from 'epub2';
import type { UnfoldChapter, UnfoldOutput } from 'src/ebook/ebook.dto';
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
			const finalAnswer: UnfoldOutput = {
				chapters: []
			};

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

					finalAnswer.chapters = validChapters.map((chapter, index) => ({
						id: String(index + 1),
						title: chapter?.title || '',
						content: chapter?.content || ''
					}));
					resolve({
						chapters: finalAnswer.chapters
					}); // Resolve the promise with the finalAnswer object
				})
				.catch(() =>
					serverError(HttpStatus.BAD_REQUEST, 'Error while parsing chapters')
				);
		});
		epub.parse();
	}) as Promise<UnfoldOutput>;
