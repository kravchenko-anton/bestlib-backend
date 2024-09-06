"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookSchema = void 0;
const zod_1 = require("zod");
const ebook_schema_1 = require("../ebook/dto/ebook.schema");
const short_genre_schema_1 = require("../../genre/dto/short-genre.schema");
exports.UpdateBookSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    authorId: zod_1.z.string(),
    description: zod_1.z.string().max(1000).min(10).optional(),
    ebook: zod_1.z.array(ebook_schema_1.EbookSchema).min(1).optional(),
    isPublic: zod_1.z.boolean().optional(),
    recommendable: zod_1.z.boolean().optional(),
    rating: zod_1.z.number().min(1).positive().optional(),
    picture: zod_1.z.string().optional(),
    genres: zod_1.z.array(short_genre_schema_1.ShortGenreSchema).min(1).optional()
});
//# sourceMappingURL=update.book.schema.js.map