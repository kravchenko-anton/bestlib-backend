import { z } from 'zod';
export declare const TranslateTextSchema: z.ZodObject<{
    targetLang: z.ZodString;
    text: z.ZodString;
    context: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text?: string;
    context?: string;
    targetLang?: string;
}, {
    text?: string;
    context?: string;
    targetLang?: string;
}>;
export type TranslateTextSchemaType = z.infer<typeof TranslateTextSchema>;
