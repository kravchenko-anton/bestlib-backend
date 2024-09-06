import { z } from 'zod';
declare const CreateReaction_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
}>>;
export declare class CreateReaction extends CreateReaction_base {
}
declare const UpdateReaction_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
}>>;
export declare class UpdateReaction extends UpdateReaction_base {
}
declare const ReactionListOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
}>>;
export declare class ReactionListOutput extends ReactionListOutput_base {
}
declare const ReactionByBookOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
}>>;
export declare class ReactionByBookOutput extends ReactionByBookOutput_base {
}
export {};
