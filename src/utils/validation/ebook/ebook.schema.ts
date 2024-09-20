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
		file: z.string(),
		onLoadScript: z.string(),
		functionEnums: z.object({
			scrollToProgress: z.string(),
			scrollToChapter: z.string(),
			removeAllTextSelection: z.string(),
			wrapReactionsInMarkTag: z.string()
		})
	})
	.merge(ShortBookSchema.pick({ title: true, picture: true, author: true }));
