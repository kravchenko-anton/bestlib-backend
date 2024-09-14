"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbookOutput = exports.BaseChapter = exports.StoredEBook = exports.ChapterType = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const chapter_schema_1 = require("./chapter.schema");
const ebook_schema_1 = require("./ebook.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class ChapterType extends (0, zod_nestjs_1.createZodDto)(chapter_schema_1.ChapterSchema) {
}
exports.ChapterType = ChapterType;
class StoredEBook extends (0, zod_nestjs_1.createZodDto)(ebook_schema_1.StoredEBookSchema) {
}
exports.StoredEBook = StoredEBook;
class BaseChapter extends (0, zod_nestjs_1.createZodDto)(chapter_schema_1.ChapterPayloadSchema) {
}
exports.BaseChapter = BaseChapter;
class EbookOutput extends (0, zod_nestjs_1.createZodDto)(ebook_schema_1.EbookOutputSchema) {
}
exports.EbookOutput = EbookOutput;
//# sourceMappingURL=ebook.dto.js.map