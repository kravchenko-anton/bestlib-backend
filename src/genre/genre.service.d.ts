import { PrismaService } from '../utils/services/prisma.service';
export declare class GenreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    catalog(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        icon: string;
        emoji: string;
    }[]>;
    byId(genreId: string): Promise<{
        id: string;
        name: string;
        icon: string;
        emoji: string;
        books: {
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
}
