import { CreateReaction, ReactionByBookOutput, UpdateReaction } from '@/src/reaction/dto/reaction.dto';
import { ReactionService } from './reaction.service';
export declare class ReactionController {
    private readonly reactionService;
    constructor(reactionService: ReactionService);
    create(userId: string, dto: CreateReaction): Promise<{
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
    reactionByBook(id: string, userId: string): Promise<ReactionByBookOutput[]>;
    update(userId: string, dto: UpdateReaction): Promise<{
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
