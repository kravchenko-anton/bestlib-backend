import { z } from 'zod';
export declare const UpdateReactionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    text: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    xpath: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    startOffset: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    endOffset: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    type?: string;
    description?: string;
    text?: string;
    xpath?: string;
    startOffset?: number;
    endOffset?: number;
}, {
    id?: string;
    type?: string;
    description?: string;
    text?: string;
    xpath?: string;
    startOffset?: number;
    endOffset?: number;
}>;
export type UpdateReactionSchemaType = z.infer<typeof UpdateReactionSchema>;
