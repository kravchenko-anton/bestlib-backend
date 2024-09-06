import { z } from 'zod';
export declare const ReactionListOutputSchema: z.ZodObject<{
    count: z.ZodNumber;
    picture: z.ZodString;
    slug: z.ZodString;
    title: z.ZodString;
    author: z.ZodString;
}, "strip", z.ZodTypeAny, {
    picture?: string;
    title?: string;
    slug?: string;
    author?: string;
    count?: number;
}, {
    picture?: string;
    title?: string;
    slug?: string;
    author?: string;
    count?: number;
}>;
export declare const ReactionByBookOutputSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    text: z.ZodString;
    xpath: z.ZodString;
    createdAt: z.ZodDate;
    startOffset: z.ZodNumber;
    endOffset: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    type?: string;
    text?: string;
    xpath?: string;
    startOffset?: number;
    endOffset?: number;
}, {
    id?: string;
    createdAt?: Date;
    type?: string;
    text?: string;
    xpath?: string;
    startOffset?: number;
    endOffset?: number;
}>;
