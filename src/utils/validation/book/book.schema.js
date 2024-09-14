"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoBySlugSchema = exports.CatalogOutputSchema = exports.FullBookSchema = exports.BookSchema = exports.ShortBookSchema = void 0;
const zod_1 = require("zod");
const short_genre_schema_1 = require("../../../genre/dto/short-genre.schema");
const base_catalog_schema_1 = require("../../common/base.catalog.schema");
exports.ShortBookSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    picture: zod_1.z.string(),
    author: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string()
    }),
    rating: zod_1.z.number()
});
exports.BookSchema = zod_1.z
    .object({
    description: zod_1.z.string(),
    readingTime: zod_1.z.number(),
    chapters: zod_1.z.number(),
    rating: zod_1.z.number(),
    isPublic: zod_1.z.boolean(),
    genres: zod_1.z.array(short_genre_schema_1.ShortGenreSchema)
})
    .merge(exports.ShortBookSchema);
exports.FullBookSchema = exports.BookSchema.merge(zod_1.z
    .object({
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    recommendable: zod_1.z.boolean(),
    ebook: zod_1.z.string(),
    _count: zod_1.z
        .object({
        finishedBy: zod_1.z.number(),
        readingBy: zod_1.z.number(),
        savedBy: zod_1.z.number()
    })
        .strict(),
    statistics: zod_1.z.array(zod_1.z.object({
        endDate: zod_1.z.date(),
        progressDelta: zod_1.z.number(),
        pagesRead: zod_1.z.number(),
        readingTimeMs: zod_1.z.number()
    }))
})
    .strict());
exports.CatalogOutputSchema = zod_1.z
    .object({
    data: zod_1.z.array(exports.BookSchema)
})
    .merge(base_catalog_schema_1.BaseCatalogSchema);
exports.infoBySlugSchema = exports.BookSchema.merge(zod_1.z.object({
    fromSameAuthor: zod_1.z.array(exports.ShortBookSchema)
}));
//# sourceMappingURL=book.schema.js.map