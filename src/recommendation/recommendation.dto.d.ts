import { z } from 'zod';
export declare const UpdateRecommendationDtoSchema: z.ZodObject<{
    genreSlugs: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    genreSlugs?: string[];
}, {
    genreSlugs?: string[];
}>;
declare const UpdateRecommendationDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    genreSlugs: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    genreSlugs?: string[];
}, {
    genreSlugs?: string[];
}>>;
export declare class UpdateRecommendationDto extends UpdateRecommendationDto_base {
}
export {};
