import type { ShortBook } from '@/src/book/dto/book.dto';
import * as cacheManagerType from 'cache-manager';
import { RecommendationService } from '../recommendation/recommendation.service';
import { PrismaService } from '../utils/services/prisma.service';
export declare class CatalogService {
    private readonly prisma;
    private readonly recommendationService;
    private cacheManager;
    constructor(prisma: PrismaService, recommendationService: RecommendationService, cacheManager: cacheManagerType.Cache);
    search(query: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    featured(userId: string): Promise<{
        picksOfWeek: ShortBook[];
        genres: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string;
            emoji: string;
        }[];
        bestSellingBooks: ShortBook[];
        newReleases: ShortBook[];
        booksBySelectedGenres: ({
            author: {
                id: string;
                name: string;
            };
        } & {
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
        })[][];
    }>;
    picksOfTheWeek(skippedBookSlugs?: string[]): Promise<ShortBook[]>;
    private bestSellersBooks;
    private newReleases;
}
