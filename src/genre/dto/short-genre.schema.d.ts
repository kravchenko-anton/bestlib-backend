import { z } from 'zod';
export declare const ShortGenreSchema: z.ZodObject<{
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
}>;
