import { z } from 'zod';
import { ShortGenreSchema } from '../../genre/dto/short-genre.schema';
import { ChapterPayloadSchema } from '../../ebook/dto/chapter.schema';

export const CreateBookSchema = z.object({
	title: z.string(),
	slug: z.string(),
	authorId: z.string(),
	summary: z.string().max(1000).min(10),
	concept: z.string().max(1000).min(10),
	description: z.string().max(1000).min(10),
	rating: z.number().min(1).positive(),
	chapters: z.array(ChapterPayloadSchema).min(1),
	picture: z.string(),
	genres: z.array(ShortGenreSchema).min(1)
});

export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>;
