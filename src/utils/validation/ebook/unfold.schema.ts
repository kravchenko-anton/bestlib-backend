import { z } from 'zod';
import { UnfoldChapterSchema } from './chapter.schema';

export const UnfoldOutputSchema = z.object({
	chapters: z.array(UnfoldChapterSchema)
});
