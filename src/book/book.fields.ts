import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { Prisma } from '@prisma/client';
import { slugify } from '@/src/utils/helpers/slugify';
import { CreateBookSchemaType } from '@/src/book/dto/create.book.schema';

export const infoBySlug = {
	title: true,
	isPublic: true,
	id: true,
	chapters: true,
	picture: true,
	author: {
		select: {
			id: true,
			name: true,
			avatar: true
		}
	},

	description: true,
	mainGenre: false,
	readingTime: true,
	rating: true,
	genres: { select: ReturnGenreObject }
};
export const infoBySlugAdminFields: (bookId: string) => Prisma.BookSelect = (
	bookId: string
) =>
	Prisma.validator<Prisma.BookSelect>()({
		id: true,
		chapters: true,
		title: true,
		picture: true,
		recommendable: true,
		author: true,
		slug: true,
		createdAt: true,
		updatedAt: true,
		rating: true,
		pagesCount: true,
		readingTime: true,
		genres: {
			select: ReturnGenreObject
		},
		ebook: true,
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
			readingTime: true,
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

export const bookCreateFields = ({
	dto,
	genreIds,
	mainGenreId,
	ebookName,
	readingTime,
	chaptersCount,
	pagesCount
}: {
	dto: CreateBookSchemaType;
	genreIds: { id: string }[];
	mainGenreId: string;
	ebookName: string;
	readingTime: number;
	chaptersCount: number;
	pagesCount: number;
}) =>
	Prisma.validator<Prisma.BookCreateInput>()({
		pagesCount: pagesCount,
		slug: dto.slug || slugify(dto.title),
		chapters: chaptersCount,
		title: dto.title,
		picture: dto.picture,
		rating: dto.rating,
		readingTime: readingTime,
		description: dto.description,
		ebook: ebookName,
		author: {
			connect: {
				id: dto.authorId
			}
		},
		keyPoints: dto.keyPoints,
		genres: {
			connect: genreIds
		},
		mainGenre: {
			connect: {
				id: mainGenreId
			}
		}
	});
