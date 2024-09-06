import { z } from 'zod';
declare const UploadOutputDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>>;
export declare class UploadOutputDto extends UploadOutputDto_base {
}
export {};
