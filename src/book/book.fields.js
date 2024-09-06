"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookCreateFields = exports.bookCatalogFields = exports.infoBySlugAdminFields = exports.infoBySlug = void 0;
const return_genre_object_1 = require("../genre/return.genre.object");
const client_1 = require("@prisma/client");
const slugify_1 = require("../utils/helpers/slugify");
exports.infoBySlug = {
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
    genres: { select: return_genre_object_1.ReturnGenreObject }
};
const infoBySlugAdminFields = (bookId) => client_1.Prisma.validator()({
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
        select: return_genre_object_1.ReturnGenreObject
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
exports.infoBySlugAdminFields = infoBySlugAdminFields;
const bookCatalogFields = ({ page, perPage, searchTerm }) => ({
    take: perPage,
    select: client_1.Prisma.validator()({
        author: true,
        chapters: true,
        title: true,
        picture: true,
        id: true,
        genres: { select: return_genre_object_1.ReturnGenreObject },
        readingTime: true,
        rating: true,
        isPublic: true,
        description: true,
        mainGenre: {
            select: return_genre_object_1.ReturnGenreObject
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
});
exports.bookCatalogFields = bookCatalogFields;
const bookCreateFields = ({ dto, genreIds, mainGenreId, ebookName, readingTime, chaptersCount, pagesCount }) => client_1.Prisma.validator()({
    pagesCount: pagesCount,
    slug: dto.slug || (0, slugify_1.slugify)(dto.title),
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
exports.bookCreateFields = bookCreateFields;
//# sourceMappingURL=book.fields.js.map