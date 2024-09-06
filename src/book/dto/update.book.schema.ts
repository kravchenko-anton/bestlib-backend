import { z } from 'zod';
import { EbookSchema } from '../ebook/dto/ebook.schema';
import { ShortGenreSchema } from '../../genre/dto/short-genre.schema';

export const UpdateBookSchema = z.object({
	title: z.string().optional(),
	authorId: z.string(),
	description: z.string().max(1000).min(10).optional(),
	ebook: z.array(EbookSchema).min(1).optional(),
	isPublic: z.boolean().optional(),
	recommendable: z.boolean().optional(),
	rating: z.number().min(1).positive().optional(),
	picture: z.string().optional(),
	genres: z.array(ShortGenreSchema).min(1).optional()
});

export type UpdateBookSchemaType = z.infer<typeof UpdateBookSchema>;
