import { z } from 'zod';
import { ShortGenreSchema } from '../../genre/dto/short-genre.schema';
import { BaseCatalogSchema } from '../../../src/utils/common/base.catalog.schema';

export const ShortBookSchema = z.object({
	id: z.string(),
	title: z.string(),
	picture: z.string(),
	author: z.object({
		id: z.string(),
		name: z.string()
	}),
	rating: z.number()
});
export const BookSchema = z
	.object({
		description: z.string(),
		readingTime: z.number(),
		chapters: z.number(),
		rating: z.number(),
		isPublic: z.boolean(),
		genres: z.array(ShortGenreSchema)
	})
	.merge(ShortBookSchema);

export const FullBookSchema = BookSchema.merge(
	z
		.object({
			createdAt: z.date(),
			updatedAt: z.date(),
			recommendable: z.boolean(),
			ebook: z.string(),
			_count: z
				.object({
					finishedBy: z.number(),
					readingBy: z.number(),
					savedBy: z.number()
				})
				.strict(),
			statistics: z.array(
				z.object({
					endDate: z.date(),
					progressDelta: z.number(),
					pagesRead: z.number(),
					readingTimeMs: z.number()
				})
			)
		})
		.strict()
);

export const CatalogOutputSchema = z
	.object({
		data: z.array(BookSchema)
	})
	.merge(BaseCatalogSchema);

export const infoBySlugSchema = BookSchema.merge(
	z.object({
		fromSameAuthor: z.array(ShortBookSchema)
	})
);
