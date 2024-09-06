"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoBySlug = exports.CatalogOutput = exports.FullBook = exports.Book = exports.UpdateBookDto = exports.ShortBook = exports.CreateBookDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const create_book_schema_1 = require("./create.book.schema");
const book_schema_1 = require("./book.schema");
const update_book_schema_1 = require("./update.book.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class CreateBookDto extends (0, zod_nestjs_1.createZodDto)(create_book_schema_1.CreateBookSchema) {
}
exports.CreateBookDto = CreateBookDto;
class ShortBook extends (0, zod_nestjs_1.createZodDto)(book_schema_1.ShortBookSchema) {
}
exports.ShortBook = ShortBook;
class UpdateBookDto extends (0, zod_nestjs_1.createZodDto)(update_book_schema_1.UpdateBookSchema) {
}
exports.UpdateBookDto = UpdateBookDto;
class Book extends (0, zod_nestjs_1.createZodDto)(book_schema_1.BookSchema) {
}
exports.Book = Book;
class FullBook extends (0, zod_nestjs_1.createZodDto)(book_schema_1.FullBookSchema) {
}
exports.FullBook = FullBook;
class CatalogOutput extends (0, zod_nestjs_1.createZodDto)(book_schema_1.CatalogOutputSchema) {
}
exports.CatalogOutput = CatalogOutput;
class InfoBySlug extends (0, zod_nestjs_1.createZodDto)(book_schema_1.infoBySlugSchema) {
}
exports.InfoBySlug = InfoBySlug;
//# sourceMappingURL=book.dto.js.map