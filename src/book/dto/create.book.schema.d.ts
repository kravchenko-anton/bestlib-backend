import { z } from 'zod';
export declare const CreateBookSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    authorId: z.ZodString;
    description: z.ZodString;
    ebook: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        chapters: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            name?: string;
            text?: string;
        }, {
            id?: string;
            name?: string;
            text?: string;
        }>, "many">;
    }, {
        id: z.ZodString;
        title: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    }>, "strip", z.ZodTypeAny, {
        id?: string;
        title?: string;
        chapters?: {
            id?: string;
            name?: string;
            text?: string;
        }[];
    }, {
        id?: string;
        title?: string;
        chapters?: {
            id?: string;
            name?: string;
            text?: string;
        }[];
    }>, "many">;
    rating: z.ZodNumber;
    picture: z.ZodString;
    keyPoints: z.ZodString;
    genres: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        icon: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }, {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    picture?: string;
    description?: string;
    title?: string;
    slug?: string;
    ebook?: {
        id?: string;
        title?: string;
        chapters?: {
            id?: string;
            name?: string;
            text?: string;
        }[];
    }[];
    rating?: number;
    keyPoints?: string;
    authorId?: string;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
}, {
    picture?: string;
    description?: string;
    title?: string;
    slug?: string;
    ebook?: {
        id?: string;
        title?: string;
        chapters?: {
            id?: string;
            name?: string;
            text?: string;
        }[];
    }[];
    rating?: number;
    keyPoints?: string;
    authorId?: string;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
}>;
export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>;
