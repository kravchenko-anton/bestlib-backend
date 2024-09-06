"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbookSchema = exports.StoredEBookSchema = exports.EbookOutputSchema = exports.EBookBaseSchema = void 0;
const zod_1 = require("zod");
const book_schema_1 = require("../../dto/book.schema");
const chapter_schema_1 = require("./chapter.schema");
exports.EBookBaseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z
        .string()
        .max(100)
        .min(3)
        .refine(value => value !== 'undefined', {
        message: 'Name cannot be empty'
    })
        .refine(value => !value.includes('.epub'), {
        message: 'Title cannot include .epub'
    })
});
exports.EbookOutputSchema = zod_1.z
    .object({
    file: zod_1.z.string(),
    chapters: zod_1.z.array(chapter_schema_1.OutputChapterSchema)
})
    .merge(book_schema_1.ShortBookSchema.pick({ title: true, picture: true }));
exports.StoredEBookSchema = zod_1.z
    .object({
    chapters: zod_1.z.array(chapter_schema_1.ChapterSchema).min(1)
})
    .merge(exports.EBookBaseSchema);
exports.EbookSchema = zod_1.z
    .object({
    chapters: zod_1.z.array(chapter_schema_1.ChapterPayloadSchema).min(1)
})
    .merge(exports.EBookBaseSchema);
//# sourceMappingURL=ebook.schema.js.map