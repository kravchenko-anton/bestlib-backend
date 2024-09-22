import { BaseCatalogSchema } from '@/src/utils/common/base.catalog.schema';
import { ShortBookSchema } from '@/src/utils/validation/book/book.schema';
import { ShortGenreSchema } from '@/src/utils/validation/short-genre.schema';
import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string(),
	createdAt: z.date(),
	email: z.string().email(),
	socialId: z.string().nullable().optional(),
	picture: z.string(),
	fullName: z.string(),
	location: z.string()
});
export const CatalogUserOutputSchema = z
	.object({
		id: z.string(),
		email: z.string(),
		selectedGenres: z.array(ShortGenreSchema),
		statistics: z.array(
			z.object({
				endDate: z.date(),
				progressDelta: z.number(),
				readingTimeMs: z.number()
			})
		),
		_count: z
			.object({
				savedBooks: z.number(),
				finishedBooks: z.number(),
				readingBooks: z.number()
			})
			.strict()
	})
	.merge(UserSchema);

export const UserCatalogOutputSchema = z
	.object({
		data: z.array(CatalogUserOutputSchema)
	})
	.merge(BaseCatalogSchema);

export const UserLibraryOutputSchema = z.object({
	readingBooks: z.array(
		ShortBookSchema.merge(
			z.object({
				readingHistory: z
					.object({
						progress: z.number(),
						scrollPosition: z.number()
					})
					.nullable()
			})
		)
	),
	finishedBooks: z.array(ShortBookSchema),
	savedBooks: z.array(ShortBookSchema)
});

export const HistorySchema = z.object({
	startDate: z.date(),
	endDate: z.date(),
	startProgress: z.number(),
	id: z.string(),
	endProgress: z.number(),
	progressDelta: z.number(),
	readingTimeMs: z.number(),
	scrollPosition: z.number(),
	bookId: z.string()
});

export const UserStatisticsSchema = z.object({
	progressByCurrentWeek: z.array(
		z.object({
			day: z.string(),
			isCurrentDay: z.boolean(),
			readingTimeMs: z.number(),
			dayProgress: z.number()
		})
	),
	pepTalk: z.string(),
	goalMinutes: z.number(),
	userSteak: z.number()
});
