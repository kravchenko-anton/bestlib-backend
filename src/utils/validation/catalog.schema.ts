import { ShortGenreSchema } from '@/src/utils/validation/short-genre.schema';
import { z } from 'zod';
import { ShortBookSchema } from './book/book.schema';

export const FeaturedOutputSchema = z.object({
	//  picksOfWeek: ShortBook[];   interestedGenres: {    id: number;    name: string;   }[];   bestSellingBooks: ShortBook[];   newReleases: ShortBook[];   booksBySelectedGenres: { ...; }[][];
	picksOfWeek: z.array(ShortBookSchema),
	genres: z.array(ShortGenreSchema),
	bestSellingBooks: z.array(ShortBookSchema),
	booksBySelectedGenres: z.array(
		z.object({
			name: z.string(),
			books: z.array(ShortBookSchema)
		})
	)
});
