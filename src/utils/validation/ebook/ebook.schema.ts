import { ShortBookSchema } from '@/src/utils/validation/book/book.schema';
import { z } from 'zod';

export const EbookOutputSchema = z
	.object({
		chapters: z.array(
			z.object({
				title: z.string(),
				link: z.string()
			})
		),
		functions: z.object({
			getFile: z.function(
				z.tuple([
					z.object({
						fontScript: z.string(),
						defaultProperties: z.object({
							scrollPosition: z.number(),
							theme: z.string(),
							reactions: z.array(
								z.object({
									bookId: z.string(),
									type: z.string(),
									text: z.string(),
									xpath: z.string(),
									startOffset: z.number(),
									endOffset: z.number()
								})
							)
						})
					})
				]),
				z.string() // The function returns a string
			),
			scrollToProgress: z.function(z.tuple([z.number()]), z.string()),
			scrollToChapter: z.function(z.tuple([z.string()]), z.string()),
			removeAllTextSelection: z.function(z.tuple([]), z.string()),
			injectStyle: z.function(z.tuple([z.string()]), z.string()),
			wrapReactionsInMarkTag: z.function(
				z.tuple([
					z.object({
						bookId: z.string(),
						type: z.string(),
						text: z.string(),
						xpath: z.string(),
						startOffset: z.number(),
						endOffset: z.number()
					})
				]),
				z.string()
			) // Takes SelectReactionType, returns a string
		})
	})
	.merge(ShortBookSchema.pick({ title: true, picture: true }));
