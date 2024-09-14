"use strict";
// Promise<{id: number, createdAt: Date, type: string, text: string, book: {picture: string, title: string, slug: string, author: string}}[]>
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionByBookOutputSchema = exports.ReactionListOutputSchema = void 0;
const zod_1 = require("zod");
exports.ReactionListOutputSchema = zod_1.z.object({
    count: zod_1.z.number(),
    picture: zod_1.z.string(),
    slug: zod_1.z.string(),
    title: zod_1.z.string(),
    author: zod_1.z.string()
});
exports.ReactionByBookOutputSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.string(),
    text: zod_1.z.string(),
    xpath: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    startOffset: zod_1.z.number(),
    endOffset: zod_1.z.number()
});
//# sourceMappingURL=reaction.schema.js.map