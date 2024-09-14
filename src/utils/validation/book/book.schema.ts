import { ShortGenreSchema } from '@/src/utils/validation/short-genre.schema';
import { z } from 'zod';
import { BaseCatalogSchema } from '../../common/base.catalog.schema';

export const ShortBookSchema = z.object({
	id: z.string(),
	title: z.string(),
	picture: z.string(),
	author: z
		.object({
			id: z.string(),
			name: z.string()
		})
		.required(),
	rating: z.number()
});
export const BookSchema = z
	.object({
		summary: z.string(),
		concept: z.string(),
		description: z.string(),
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
			authorId: z.string(),
			isRecommendable: z.boolean(),
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

export const infoByIdSchema = BookSchema.merge(
	z.object({
		fromSameAuthor: z.array(ShortBookSchema)
	})
);
