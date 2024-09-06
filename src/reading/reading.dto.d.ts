import { z } from 'zod';
declare const GptExplain_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
}>>;
export declare class GptExplain extends GptExplain_base {
}
declare const TranslateText_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
}>>;
export declare class TranslateText extends TranslateText_base {
}
export {};
