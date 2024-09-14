"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookSchema = void 0;
const zod_1 = require("zod");
const ebook_schema_1 = require("../ebook/dto/ebook.schema");
const short_genre_schema_1 = require("../../../genre/dto/short-genre.schema");
exports.CreateBookSchema = zod_1.z.object({
    title: zod_1.z.string(),
    slug: zod_1.z.string(),
    authorId: zod_1.z.string(),
    description: zod_1.z.string().max(1000).min(10),
    ebook: zod_1.z.array(ebook_schema_1.EbookSchema).min(1),
    rating: zod_1.z.number().min(1).positive(),
    picture: zod_1.z.string(),
    keyPoints: zod_1.z.string(),
    genres: zod_1.z.array(short_genre_schema_1.ShortGenreSchema).min(1)
});
//# sourceMappingURL=create.book.schema.js.map