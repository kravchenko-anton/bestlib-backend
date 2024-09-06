import type { ReadingHistory } from '@/src/user/dto/user.dto';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../utils/services/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserById(id: string, selectObject?: Prisma.UserSelect): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        goalMinutes: number;
        socialId: string;
        password: string;
        authType: import(".prisma/client").$Enums.AuthType;
        picture: string;
        fullName: string;
        location: string;
        role: import(".prisma/client").$Enums.Role;
        selectedGenres: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string;
            emoji: string;
        }[];
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
        savedBooks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string;
            recommendable: boolean;
            picture: string;
            ebook: string;
            readingTime: number;
            chapters: number;
            pagesCount: number;
            rating: number;
            isPublic: boolean;
            mainGenreId: string;
            keyPoints: string;
            authorId: string;
            bookSeriesId: string | null;
        }[];
        finishedBooks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string;
            recommendable: boolean;
            picture: string;
            ebook: string;
            readingTime: number;
            chapters: number;
            pagesCount: number;
            rating: number;
            isPublic: boolean;
            mainGenreId: string;
            keyPoints: string;
            authorId: string;
            bookSeriesId: string | null;
        }[];
        readingBooks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string;
            recommendable: boolean;
            picture: string;
            ebook: string;
            readingTime: number;
            chapters: number;
            pagesCount: number;
            rating: number;
            isPublic: boolean;
            mainGenreId: string;
            keyPoints: string;
            authorId: string;
            bookSeriesId: string | null;
        }[];
        readingHistory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            readingTimeMs: number;
            scrollPosition: number;
            startProgress: number;
            endProgress: number;
            progressDelta: number;
            bookId: string;
            userId: string;
        }[];
        _count: {
            selectedGenres: number;
            reactions: number;
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
            readingHistory: number;
        };
    }>;
    syncHistory(dto: ReadingHistory[], userId: string): Promise<void>;
    adjustGoal(userId: string, goal: number): Promise<void>;
    userStatistics(userId: string): Promise<{
        userSteak: number;
        pepTalk: string;
        progressByCurrentWeek: any[];
        goalMinutes: number;
    }>;
    library(userId: string): Promise<{
        readingBooks: {
            readingHistory: {
                scrollPosition: number;
                endDate: Date;
                progress: number;
            };
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
        finishedBooks: {
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
        savedBooks: {
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
    }>;
    catalog(searchTerm: string, page: number): Promise<{
        data: {
            statistics: import("@/src/utils/services/statisticReduce.service").StatisticReduceOutputType;
            id: string;
            createdAt: Date;
            email: string;
            socialId: string;
            picture: string;
            fullName: string;
            location: string;
            role: import(".prisma/client").$Enums.Role;
            selectedGenres: {
                id: string;
                name: string;
                icon: string;
                emoji: string;
            }[];
            _count: {
                savedBooks: number;
                finishedBooks: number;
                readingBooks: number;
            };
        }[];
        canLoadMore: boolean;
        totalPages: number;
    }>;
    remove(id: string): Promise<void>;
    startReading(userId: string, slug: string): Promise<void>;
    removeFromLibrary(userId: string, slug: string): Promise<void>;
    finishReading(userId: string, slug: string): Promise<void>;
    toggleSave(userId: string, slug: string): Promise<boolean>;
    private checkBookExist;
    isSaved(userId: string, slug: string): Promise<boolean>;
}
