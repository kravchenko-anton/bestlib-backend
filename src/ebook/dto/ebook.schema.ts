import { z } from 'zod';
import { OutputChapterSchema, UnfoldChapterSchema } from './chapter.schema';
import { ShortBookSchema } from '@/src/book/dto/book.schema';

export const UnfoldOutputSchema = z.object({
	chapters: z.array(UnfoldChapterSchema),
	images: z.array(
		z.object({
			id: z.string(),
			href: z.string(),
			mimeType: z.string(),
			data: z.string()
		})
	)
});

export const EbookOutputSchema = z
	.object({
		file: z.string(),
		chapters: z.array(OutputChapterSchema)
	})
	.merge(ShortBookSchema.pick({ title: true, picture: true }));

export type UnfoldOutputType = z.infer<typeof UnfoldOutputSchema>;
