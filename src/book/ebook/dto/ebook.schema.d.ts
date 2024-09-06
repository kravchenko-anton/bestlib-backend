import { z } from 'zod';
export declare const EBookBaseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    title?: string;
}, {
    id?: string;
    title?: string;
}>;
export declare const EbookOutputSchema: z.ZodObject<z.objectUtil.extendShape<{
    file: z.ZodString;
    chapters: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        children: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            link: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            link?: string;
        }, {
            name?: string;
            link?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        title?: string;
        children?: {
            name?: string;
            link?: string;
        }[];
    }, {
        title?: string;
        children?: {
            name?: string;
            link?: string;
        }[];
    }>, "many">;
}, Pick<{
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
}, "picture" | "title">>, "strip", z.ZodTypeAny, {
    picture?: string;
    title?: string;
    chapters?: {
        title?: string;
        children?: {
            name?: string;
            link?: string;
        }[];
    }[];
    file?: string;
}, {
    picture?: string;
    title?: string;
    chapters?: {
        title?: string;
        children?: {
            name?: string;
            link?: string;
        }[];
    }[];
    file?: string;
}>;
export declare const StoredEBookSchema: z.ZodObject<z.objectUtil.extendShape<{
    chapters: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        romanNumber: z.ZodString;
        readingTime: z.ZodNumber;
    }, {
        id: z.ZodString;
        name: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
        text: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id?: string;
        name?: string;
        text?: string;
        readingTime?: number;
        romanNumber?: string;
    }, {
        id?: string;
        name?: string;
        text?: string;
        readingTime?: number;
        romanNumber?: string;
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
        readingTime?: number;
        romanNumber?: string;
    }[];
}, {
    id?: string;
    title?: string;
    chapters?: {
        id?: string;
        name?: string;
        text?: string;
        readingTime?: number;
        romanNumber?: string;
    }[];
}>;
export declare const EbookSchema: z.ZodObject<z.objectUtil.extendShape<{
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
}>;
export type EBookPayloadType = z.infer<typeof EbookSchema>;
