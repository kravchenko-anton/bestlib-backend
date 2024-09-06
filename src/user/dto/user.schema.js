"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatisticsSchema = exports.HistorySchema = exports.UserLibraryOutputSchema = exports.UserCatalogOutputSchema = exports.CatalogUserOutputSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
const short_genre_schema_1 = require("../../genre/dto/short-genre.schema");
const base_catalog_schema_1 = require("../../utils/common/base.catalog.schema");
const book_schema_1 = require("../../book/dto/book.schema");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    email: zod_1.z.string().email(),
    socialId: zod_1.z.string().nullable().optional(),
    picture: zod_1.z.string(),
    fullName: zod_1.z.string(),
    location: zod_1.z.string()
});
exports.CatalogUserOutputSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    email: zod_1.z.string(),
    selectedGenres: zod_1.z.array(short_genre_schema_1.ShortGenreSchema),
    statistics: zod_1.z.array(zod_1.z.object({
        endDate: zod_1.z.date(),
        progressDelta: zod_1.z.number(),
        readingTimeMs: zod_1.z.number()
    })),
    _count: zod_1.z
        .object({
        savedBooks: zod_1.z.number(),
        finishedBooks: zod_1.z.number(),
        readingBooks: zod_1.z.number()
    })
        .strict()
})
    .merge(exports.UserSchema);
exports.UserCatalogOutputSchema = zod_1.z
    .object({
    data: zod_1.z.array(exports.CatalogUserOutputSchema)
})
    .merge(base_catalog_schema_1.BaseCatalogSchema);
exports.UserLibraryOutputSchema = zod_1.z.object({
    readingBooks: zod_1.z.array(book_schema_1.ShortBookSchema.merge(zod_1.z.object({
        readingHistory: zod_1.z
            .object({
            progress: zod_1.z.number(),
            scrollPosition: zod_1.z.number()
        })
            .nullable()
    }))),
    finishedBooks: zod_1.z.array(book_schema_1.ShortBookSchema),
    savedBooks: zod_1.z.array(book_schema_1.ShortBookSchema)
});
exports.HistorySchema = zod_1.z.object({
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    startProgress: zod_1.z.number(),
    endProgress: zod_1.z.number(),
    progressDelta: zod_1.z.number(),
    readingTimeMs: zod_1.z.number(),
    scrollPosition: zod_1.z.number(),
    bookId: zod_1.z.string()
});
exports.UserStatisticsSchema = zod_1.z.object({
    progressByCurrentWeek: zod_1.z.array(zod_1.z.object({
        day: zod_1.z.string(),
        isCurrentDay: zod_1.z.boolean(),
        readingTimeMs: zod_1.z.number(),
        dayProgress: zod_1.z.number()
    })),
    pepTalk: zod_1.z.string(),
    goalMinutes: zod_1.z.number(),
    userSteak: zod_1.z.number()
});
//# sourceMappingURL=user.schema.js.map