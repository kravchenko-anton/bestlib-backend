import { z } from 'zod';
export declare const FindOneGenreOutputSchema: z.ZodObject<z.objectUtil.extendShape<{
    books: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            name?: string;
        }, {
            id?: string;
            name?: string;
        }>;
        rating: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }>, "many">;
}, {
    id: z.ZodString;
    name: z.ZodString;
    icon: z.ZodString;
    emoji: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    icon?: string;
    emoji?: string;
    books?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
}, {
    id?: string;
    name?: string;
    icon?: string;
    emoji?: string;
    books?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
}>;
