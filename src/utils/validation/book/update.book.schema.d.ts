import { z } from 'zod';
export declare const UpdateBookSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    authorId: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    ebook: z.ZodOptional<z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
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
    }>, "many">>;
    isPublic: z.ZodOptional<z.ZodBoolean>;
    recommendable: z.ZodOptional<z.ZodBoolean>;
    rating: z.ZodOptional<z.ZodNumber>;
    picture: z.ZodOptional<z.ZodString>;
    genres: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    picture?: string;
    description?: string;
    title?: string;
    recommendable?: boolean;
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
    isPublic?: boolean;
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
    recommendable?: boolean;
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
    isPublic?: boolean;
    authorId?: string;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
}>;
export type UpdateBookSchemaType = z.infer<typeof UpdateBookSchema>;
