import { ShortGenreSchema } from '@/src/utils/validation/short-genre.schema';
import { z } from 'zod';
import { ShortBookSchema } from '../book/book.schema';


export const FindOneGenreOutputSchema = z
	.object({
		books: z.array(ShortBookSchema)
	})
	.merge(ShortGenreSchema);


