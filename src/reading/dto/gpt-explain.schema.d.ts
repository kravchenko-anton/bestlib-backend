import { z } from 'zod';
export declare const GptExplainSchema: z.ZodObject<{
    selectedText: z.ZodString;
    context: z.ZodString;
    bookTitle: z.ZodString;
}, "strip", z.ZodTypeAny, {
    selectedText?: string;
    context?: string;
    bookTitle?: string;
}, {
    selectedText?: string;
    context?: string;
    bookTitle?: string;
}>;
export type GptExplainSchemaType = z.infer<typeof GptExplainSchema>;
