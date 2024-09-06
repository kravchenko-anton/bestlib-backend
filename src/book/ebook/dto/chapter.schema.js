"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterSchema = exports.OutputChapterSchema = exports.OutputChapterChildSchema = exports.ChapterPayloadSchema = void 0;
const zod_1 = require("zod");
exports.ChapterPayloadSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z
        .string()
        .refine(value => !value.includes('.epub'), {
        message: 'Name cannot include .epub'
    })
        .refine(value => value !== 'undefined', {
        message: 'Name cannot be empty'
    }),
    text: zod_1.z.string()
});
exports.OutputChapterChildSchema = zod_1.z.object({
    name: zod_1.z.string(),
    link: zod_1.z.string()
});
exports.OutputChapterSchema = zod_1.z.object({
    title: zod_1.z.string(),
    children: zod_1.z.array(exports.OutputChapterChildSchema)
});
exports.ChapterSchema = zod_1.z
    .object({
    romanNumber: zod_1.z.string(),
    readingTime: zod_1.z.number()
})
    .merge(exports.ChapterPayloadSchema);
//# sourceMappingURL=chapter.schema.js.map