"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedOutputSchema = void 0;
const zod_1 = require("zod");
const book_schema_1 = require("../../book/dto/book.schema");
const short_genre_schema_1 = require("./genre/short-genre.schema");
exports.FeaturedOutputSchema = zod_1.z.object({
    //  picksOfWeek: ShortBook[];   interestedGenres: {    id: number;    name: string;   }[];   bestSellingBooks: ShortBook[];   newReleases: ShortBook[];   booksBySelectedGenres: { ...; }[][];
    picksOfWeek: zod_1.z.array(book_schema_1.ShortBookSchema),
    genres: zod_1.z.array(short_genre_schema_1.ShortGenreSchema),
    bestSellingBooks: zod_1.z.array(book_schema_1.ShortBookSchema),
    newReleases: zod_1.z.array(book_schema_1.ShortBookSchema),
    booksBySelectedGenres: zod_1.z.array(zod_1.z.array(book_schema_1.ShortBookSchema))
});
//# sourceMappingURL=catalog.schema.js.map