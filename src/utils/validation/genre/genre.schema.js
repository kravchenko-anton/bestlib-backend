"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneGenreOutputSchema = void 0;
const zod_1 = require("zod");
const book_schema_1 = require("../../book/dto/book.schema");
const short_genre_schema_1 = require("./short-genre.schema");
exports.FindOneGenreOutputSchema = zod_1.z
    .object({
    books: zod_1.z.array(book_schema_1.ShortBookSchema)
})
    .merge(short_genre_schema_1.ShortGenreSchema);
//# sourceMappingURL=genre.schema.js.map