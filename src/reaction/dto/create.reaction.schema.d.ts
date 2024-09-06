import { z } from 'zod';
export declare const CreateReactionSchema: z.ZodObject<{
    bookId: z.ZodString;
    type: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    xpath: z.ZodString;
    startOffset: z.ZodNumber;
    endOffset: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: string;
    description?: string;
    text?: string;
    xpath?: string;
    startOffset?: number;
    endOffset?: number;
    bookId?: string;
}, {
    type?: string;
    description?: string;
    text?: string;
    xpath?: string;
    startOffset?: number;
    endOffset?: number;
    bookId?: string;
}>;
export type CreateReactionSchemaType = z.infer<typeof CreateReactionSchema>;
