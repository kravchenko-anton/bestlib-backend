import { ShortGenreSchema } from '@/src/utils/validation/short-genre.schema';
import { z } from 'zod';
import { ChapterPayloadSchema } from '../ebook/chapter.schema';

export enum ageEnum {
	all = 'all',
	kids = 'kids',
	teens = 'teens',
	adults = 'adults'
}
export const CreateBookSchema = z.object({
	title: z.string(),
	slug: z.string(),
	age: z.nativeEnum(ageEnum),
	authorId: z.string(),
	summary: z.string().min(10),
	concept: z.string().min(10),
	description: z.string().min(10),
	rating: z.number().min(1).positive().max(5),
	chapters: z.array(ChapterPayloadSchema).min(1),
	picture: z.string(),
	genres: z.array(ShortGenreSchema).min(1)
});

export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>;
