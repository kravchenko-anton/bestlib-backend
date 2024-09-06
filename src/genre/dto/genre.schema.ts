import { z } from 'zod';
import { ShortBookSchema } from '../../book/dto/book.schema';
import { ShortGenreSchema } from './short-genre.schema';

export const FindOneGenreOutputSchema = z
	.object({
		books: z.array(ShortBookSchema)
	})
	.merge(ShortGenreSchema);
