"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToggleSaveFields = exports.userStartReadingBookFields = exports.userRemoveFromLibraryFields = exports.userFinishReadingBookFields = exports.userCatalogFields = exports.userLibraryFields = void 0;
const return_book_object_1 = require("../book/return.book.object");
const return_genre_object_1 = require("../genre/return.genre.object");
const return_user_object_1 = require("./return.user.object");
const client_1 = require("@prisma/client");
const userLibraryFields = (userId) => ({
    where: { id: userId },
    select: client_1.Prisma.validator()({
        readingBooks: {
            select: {
                ...return_book_object_1.returnBookObject,
                readingHistory: {
                    select: {
                        id: true,
                        scrollPosition: true,
                        endProgress: true,
                        endDate: true
                    },
                    orderBy: {
                        endDate: 'desc'
                    },
                    take: 1
                }
            },
            where: {
                isPublic: true
            }
        },
        finishedBooks: {
            select: return_book_object_1.returnBookObject,
            where: {
                isPublic: true
            }
        },
        savedBooks: {
            select: return_book_object_1.returnBookObject,
            where: {
                isPublic: true
            }
        }
    })
});
exports.userLibraryFields = userLibraryFields;
const userCatalogFields = ({ page, perPage, searchTerm }) => ({
    take: perPage,
    select: client_1.Prisma.validator()({
        ...return_user_object_1.returnUserObject,
        picture: true,
        socialId: true,
        role: true,
        createdAt: true,
        fullName: true,
        location: true,
        selectedGenres: {
            select: return_genre_object_1.ReturnGenreObject
        },
        readingHistory: {
            orderBy: {
                endDate: 'asc'
            },
            select: {
                endDate: true,
                progressDelta: true,
                readingTimeMs: true,
                scrollPosition: true,
                startDate: true,
                book: {
                    select: {
                        pagesCount: true
                    }
                }
            }
        },
        _count: {
            select: {
                savedBooks: true,
                finishedBooks: true,
                readingBooks: true
            }
        }
    }),
    ...(page && {
        skip: page * perPage
    }),
    ...(searchTerm && {
        where: {
            fullName: {
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
exports.userCatalogFields = userCatalogFields;
const userFinishReadingBookFields = (slug) => client_1.Prisma.validator()({
    readingBooks: {
        disconnect: {
            slug
        }
    },
    savedBooks: {
        disconnect: {
            slug
        }
    },
    finishedBooks: {
        connect: {
            slug
        }
    }
});
exports.userFinishReadingBookFields = userFinishReadingBookFields;
const userRemoveFromLibraryFields = (slug) => client_1.Prisma.validator()({
    readingBooks: {
        disconnect: {
            slug
        }
    },
    savedBooks: {
        disconnect: {
            slug
        }
    },
    finishedBooks: {
        disconnect: {
            slug
        }
    }
});
exports.userRemoveFromLibraryFields = userRemoveFromLibraryFields;
const userStartReadingBookFields = (slug) => client_1.Prisma.validator()({
    readingBooks: {
        connect: {
            slug
        }
    },
    savedBooks: {
        disconnect: {
            slug
        }
    },
    finishedBooks: {
        disconnect: {
            slug
        }
    }
});
exports.userStartReadingBookFields = userStartReadingBookFields;
const userToggleSaveFields = ({ isSavedExist, slug }) => client_1.Prisma.validator()({
    savedBooks: {
        [isSavedExist ? 'disconnect' : 'connect']: {
            slug
        }
    },
    ...(!isSavedExist && {
        readingBooks: {
            disconnect: {
                slug
            }
        },
        finishedBooks: {
            disconnect: {
                slug
            }
        }
    })
});
exports.userToggleSaveFields = userToggleSaveFields;
//# sourceMappingURL=user.fields.js.map