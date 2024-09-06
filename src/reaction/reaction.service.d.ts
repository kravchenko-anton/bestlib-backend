import { CreateReaction, UpdateReaction } from '@/src/reaction/dto/reaction.dto';
import { PrismaService } from '@/src/utils/services/prisma.service';
export declare class ReactionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createReactionDto: CreateReaction): Promise<{
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
    }>;
    update(userId: string, updateReactionDto: UpdateReaction): Promise<{
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
    }>;
    reactionByBook(booId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        text: string;
        xpath: string;
        startOffset: number;
        endOffset: number;
    }[]>;
    reactionList(userId: string): Promise<{
        count: number;
        picture: string;
        title: string;
        slug: string;
        author: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            picture: string;
        };
    }[]>;
    remove(id: string, userId: string): Promise<{
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
    }>;
}
