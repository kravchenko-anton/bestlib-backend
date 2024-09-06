"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortGenre = exports.FindOneGenreOutput = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const genre_schema_1 = require("./genre.schema");
const short_genre_schema_1 = require("./short-genre.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class FindOneGenreOutput extends (0, zod_nestjs_1.createZodDto)(genre_schema_1.FindOneGenreOutputSchema) {
}
exports.FindOneGenreOutput = FindOneGenreOutput;
class ShortGenre extends (0, zod_nestjs_1.createZodDto)(short_genre_schema_1.ShortGenreSchema) {
}
exports.ShortGenre = ShortGenre;
//# sourceMappingURL=genre.dto.js.map