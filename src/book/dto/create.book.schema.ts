import { z } from 'zod';
import { EbookSchema } from '../ebook/dto/ebook.schema';
import { ShortGenreSchema } from '../../genre/dto/short-genre.schema';

export const CreateBookSchema = z.object({
	title: z.string(),
	slug: z.string(),
	authorId: z.string(),
	description: z.string().max(1000).min(10),
	ebook: z.array(EbookSchema).min(1),
	rating: z.number().min(1).positive(),
	picture: z.string(),
	keyPoints: z.string(),
	genres: z.array(ShortGenreSchema).min(1)
});

export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>;
