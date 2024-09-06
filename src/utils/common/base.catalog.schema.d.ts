import { z } from 'zod';
export declare const BaseCatalogSchema: z.ZodObject<{
    canLoadMore: z.ZodBoolean;
    totalPages: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    canLoadMore?: boolean;
    totalPages?: number;
}, {
    canLoadMore?: boolean;
    totalPages?: number;
}>;
