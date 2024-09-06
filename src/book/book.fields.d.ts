import { Prisma } from '@prisma/client';
import { CreateBookSchemaType } from '@/src/book/dto/create.book.schema';
export declare const infoBySlug: {
    title: boolean;
    isPublic: boolean;
    id: boolean;
    chapters: boolean;
    picture: boolean;
    author: {
        select: {
            id: boolean;
            name: boolean;
            avatar: boolean;
        };
    };
    description: boolean;
    mainGenre: boolean;
    readingTime: boolean;
    rating: boolean;
    genres: {
        select: Pick<Prisma.GenreSelect<import("@prisma/client/runtime/library").DefaultArgs>, "id" | "name" | "icon" | "emoji">;
    };
};
export declare const infoBySlugAdminFields: (bookId: string) => Prisma.BookSelect;
export declare const bookCatalogFields: ({ page, perPage, searchTerm }: {
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
        author: true;
        chapters: true;
        title: true;
        picture: true;
        id: true;
        genres: {
            select: Pick<Prisma.GenreSelect<import("@prisma/client/runtime/library").DefaultArgs>, "id" | "name" | "icon" | "emoji">;
        };
        readingTime: true;
        rating: true;
        isPublic: true;
        description: true;
        mainGenre: {
            select: Pick<Prisma.GenreSelect<import("@prisma/client/runtime/library").DefaultArgs>, "id" | "name" | "icon" | "emoji">;
        };
    };
    readonly orderBy: {
        readonly isPublic: "asc";
    };
};
export declare const bookCreateFields: ({ dto, genreIds, mainGenreId, ebookName, readingTime, chaptersCount, pagesCount }: {
    dto: CreateBookSchemaType;
    genreIds: {
        id: string;
    }[];
    mainGenreId: string;
    ebookName: string;
    readingTime: number;
    chaptersCount: number;
    pagesCount: number;
}) => {
    pagesCount: number;
    slug: string;
    chapters: number;
    title: string;
    picture: string;
    rating: number;
    readingTime: number;
    description: string;
    ebook: string;
    author: {
        connect: {
            id: string;
        };
    };
    keyPoints: string;
    genres: {
        connect: {
            id: string;
        }[];
    };
    mainGenre: {
        connect: {
            id: string;
        };
    };
};
