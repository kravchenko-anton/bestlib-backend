import { z } from 'zod';
import { OutputChapterSchema, UnfoldChapterSchema } from './chapter.schema';
import { ShortBookSchema } from '@/src/utils/validation/book/book.schema';

export const UnfoldOutputSchema = z.object({
	chapters: z.array(UnfoldChapterSchema)
});

export const EbookOutputSchema = z
	.object({
		file: z.string(),
		chapters: z.array(OutputChapterSchema)
	})
	.merge(ShortBookSchema.pick({ title: true, picture: true }));
