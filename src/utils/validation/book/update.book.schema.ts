import { ShortGenreSchema } from '@/src/utils/validation/short-genre.schema';
import { z } from 'zod';

export const UpdateBookSchema = z.object({
	title: z.string().optional(),
	authorId: z.string().optional(),
	description: z.string().min(10).optional(),
	summary: z.string().optional(),
	concept: z.string().optional(),
	isPublic: z.boolean().optional(),
	isRecommendable: z.boolean().optional(),
	rating: z.number().min(1).positive().optional(),
	picture: z.string().optional(),
	genres: z.array(ShortGenreSchema).min(1).optional()
});

export type UpdateBookSchemaType = z.infer<typeof UpdateBookSchema>;
