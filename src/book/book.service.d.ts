import { StorageService } from '../storage/storage.service';
import { PrismaService } from '../utils/services/prisma.service';
import type { Book, CreateBookDto, UpdateBookDto } from './dto/book.dto';
export declare class BookService {
    private readonly prisma;
    private storageService;
    constructor(prisma: PrismaService, storageService: StorageService);
    infoBySlug(slug: string): Promise<{
        fromSameAuthor: {
            id: string;
            picture: string;
            title: string;
            rating: number;
            author: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                picture: string;
            };
        }[];
        id: string;
        picture: string;
        description: string;
        title: string;
        readingTime: number;
        chapters: number;
        rating: number;
        isPublic: boolean;
        mainGenre: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string;
            emoji: string;
        };
        genres: {
            id: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        author: {
            id: string;
            name: string;
            avatar: never;
        };
    }>;
    infoBySlugAdmin(id: string): Promise<{
        statistics: import("@/src/utils/services/statisticReduce.service").StatisticReduceOutputType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        picture: string;
        reactions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            description: string | null;
            text: string;
            xpath: string;
            startOffset: number;
            endOffset: number;
            userId: string;
            bookId: string;
        }[];
        _count: {
            mainGenre: number;
            genres: number;
            finishedBy: number;
            savedBy: number;
            readingBy: number;
            readingHistory: number;
            reactions: number;
            bookSeries: number;
            Collections: number;
            author: number;
        };
        description: string;
        title: string;
        slug: string;
        recommendable: boolean;
        ebook: string;
        readingTime: number;
        chapters: number;
        pagesCount: number;
        rating: number;
        isPublic: boolean;
        mainGenreId: string;
        keyPoints: string;
        authorId: string;
        bookSeriesId: string;
        mainGenre: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string;
            emoji: string;
        };
        genres: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string;
            emoji: string;
        }[];
        finishedBy: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            goalMinutes: number;
            socialId: string | null;
            password: string | null;
            authType: import(".prisma/client").$Enums.AuthType;
            picture: string;
            fullName: string;
            location: string;
            role: import(".prisma/client").$Enums.Role;
        }[];
        savedBy: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            goalMinutes: number;
            socialId: string | null;
            password: string | null;
            authType: import(".prisma/client").$Enums.AuthType;
            picture: string;
            fullName: string;
            location: string;
            role: import(".prisma/client").$Enums.Role;
        }[];
        readingBy: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            goalMinutes: number;
            socialId: string | null;
            password: string | null;
            authType: import(".prisma/client").$Enums.AuthType;
            picture: string;
            fullName: string;
            location: string;
            role: import(".prisma/client").$Enums.Role;
        }[];
        bookSeries: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
        };
        Collections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            banner: string;
        }[];
        author: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            picture: string;
        };
    }>;
    catalog(searchTerm: string, page: number): Promise<{
        data: {
            id: string;
            picture: string;
            description: string;
            title: string;
            readingTime: number;
            chapters: number;
            rating: number;
            isPublic: boolean;
            mainGenre: {
                id: string;
                name: string;
                icon: string;
                emoji: string;
            };
            genres: {
                id: string;
                name: string;
                icon: string;
                emoji: string;
            }[];
            author: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                picture: string;
            };
        }[];
        canLoadMore: boolean;
        totalPages: number;
    }>;
    create(dto: CreateBookDto): Promise<void>;
    remove(slug: string): Promise<void>;
    update(slug: string, dto: UpdateBookDto): Promise<void>;
    getGenres(genres: Book['genres']): Promise<{
        mainGenreId: string;
        genreIds: {
            id: string;
        }[];
    }>;
}
