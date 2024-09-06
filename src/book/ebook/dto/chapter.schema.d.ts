import { z } from 'zod';
export declare const ChapterPayloadSchema: z.ZodObject<{
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
}>;
export declare const OutputChapterChildSchema: z.ZodObject<{
    name: z.ZodString;
    link: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    link?: string;
}, {
    name?: string;
    link?: string;
}>;
export declare const OutputChapterSchema: z.ZodObject<{
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
}>;
export declare const ChapterSchema: z.ZodObject<z.objectUtil.extendShape<{
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
}>;
export type ChapterType = z.infer<typeof ChapterSchema>;
