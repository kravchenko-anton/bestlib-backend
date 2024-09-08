import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { Prisma } from '@prisma/client';

export const infoBySlug = Prisma.validator<Prisma.BookSelect>()({
	title: true,
	isPublic: true,
	id: true,
	chapters: true,
	picture: true,
	author: {
		select: {
			id: true,
			name: true,
			picture: true
		}
	},

	description: true,
	mainGenre: false,
	rating: true,
	genres: { select: ReturnGenreObject }
});
export const infoBySlugAdminFields: (bookId: string) => Prisma.BookSelect = (
	bookId: string
) =>
	Prisma.validator<Prisma.BookSelect>()({
		id: true,
		chapters: true,
		title: true,
		picture: true,
		isRecommendable: true,
		author: true,
		slug: true,
		createdAt: true,
		updatedAt: true,
		rating: true,
		genres: {
			select: ReturnGenreObject
		},
		description: true,
		isPublic: true,
		_count: {
			select: {
				finishedBy: true,
				readingBy: true,
				savedBy: true
			}
		},

		readingHistory: {
			where: {
				bookId: bookId
			},
			orderBy: {
				endDate: 'asc'
			},
			select: {
				endDate: true,
				progressDelta: true,
				readingTimeMs: true,
				scrollPosition: true,
				startDate: true
			}
		}
	});

export const bookCatalogFields = ({
	page,
	perPage,
	searchTerm
}: {
	page: number;
	perPage: number;
	searchTerm: string;
}) =>
	({
		take: perPage,
		select: Prisma.validator<Prisma.BookSelect>()({
			author: true,
			chapters: true,
			title: true,
			picture: true,
			id: true,
			genres: { select: ReturnGenreObject },
			rating: true,
			isPublic: true,
			description: true,
			mainGenre: {
				select: ReturnGenreObject
			}
		}),
		orderBy: {
			isPublic: 'asc'
		},
		...(page && {
			skip: page * perPage
		}),
		...(searchTerm && {
			where: {
				title: {
					contains: searchTerm
				}
			},
			...(searchTerm && {
				where: {
					id: searchTerm
				}
			})
		})
	}) as const;
