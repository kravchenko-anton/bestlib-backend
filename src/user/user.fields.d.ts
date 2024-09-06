import { Prisma } from '@prisma/client';
export declare const userLibraryFields: (userId: string) => {
    readonly where: {
        readonly id: string;
    };
    readonly select: {
        readingBooks: {
            select: {
                readingHistory: {
                    select: {
                        id: true;
                        scrollPosition: true;
                        endProgress: true;
                        endDate: true;
                    };
                    orderBy: {
                        endDate: "desc";
                    };
                    take: 1;
                };
                id?: boolean;
                picture?: boolean;
                title?: boolean;
                rating?: boolean;
                author?: boolean | Prisma.AuthorDefaultArgs<import("@prisma/client/runtime/library").DefaultArgs>;
            };
            where: {
                isPublic: true;
            };
        };
        finishedBooks: {
            select: Pick<Prisma.BookSelect<import("@prisma/client/runtime/library").DefaultArgs>, "id" | "picture" | "title" | "rating" | "author">;
            where: {
                isPublic: true;
            };
        };
        savedBooks: {
            select: Pick<Prisma.BookSelect<import("@prisma/client/runtime/library").DefaultArgs>, "id" | "picture" | "title" | "rating" | "author">;
            where: {
                isPublic: true;
            };
        };
    };
};
export declare const userCatalogFields: ({ page, perPage, searchTerm }: {
    page: number;
    perPage: number;
    searchTerm: string;
}) => {
    readonly where: {
        id: string;
    };
    readonly skip: number;
    readonly take: number;
    readonly select: {
        picture: true;
        socialId: true;
        role: true;
        createdAt: true;
        fullName: true;
        location: true;
        selectedGenres: {
            select: Pick<Prisma.GenreSelect<import("@prisma/client/runtime/library").DefaultArgs>, "id" | "name" | "icon" | "emoji">;
        };
        readingHistory: {
            orderBy: {
                endDate: "asc";
            };
            select: {
                endDate: true;
                progressDelta: true;
                readingTimeMs: true;
                scrollPosition: true;
                startDate: true;
                book: {
                    select: {
                        pagesCount: true;
                    };
                };
            };
        };
        _count: {
            select: {
                savedBooks: true;
                finishedBooks: true;
                readingBooks: true;
            };
        };
        id?: boolean;
        email?: boolean;
    };
};
export declare const userFinishReadingBookFields: (slug: string) => {
    readingBooks: {
        disconnect: {
            slug: string;
        };
    };
    savedBooks: {
        disconnect: {
            slug: string;
        };
    };
    finishedBooks: {
        connect: {
            slug: string;
        };
    };
};
export declare const userRemoveFromLibraryFields: (slug: string) => {
    readingBooks: {
        disconnect: {
            slug: string;
        };
    };
    savedBooks: {
        disconnect: {
            slug: string;
        };
    };
    finishedBooks: {
        disconnect: {
            slug: string;
        };
    };
};
export declare const userStartReadingBookFields: (slug: string) => {
    readingBooks: {
        connect: {
            slug: string;
        };
    };
    savedBooks: {
        disconnect: {
            slug: string;
        };
    };
    finishedBooks: {
        disconnect: {
            slug: string;
        };
    };
};
export declare const userToggleSaveFields: ({ isSavedExist, slug }: {
    isSavedExist: boolean;
    slug: string;
}) => {
    readingBooks: {
        disconnect: {
            slug: string;
        };
    };
    finishedBooks: {
        disconnect: {
            slug: string;
        };
    };
    savedBooks: {
        [x: string]: {
            slug: string;
        };
    };
};
