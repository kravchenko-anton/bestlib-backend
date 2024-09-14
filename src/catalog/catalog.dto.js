"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedOutput = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const catalog_schema_1 = require("./catalog.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class FeaturedOutput extends (0, zod_nestjs_1.createZodDto)(catalog_schema_1.FeaturedOutputSchema) {
}
exports.FeaturedOutput = FeaturedOutput;
//# sourceMappingURL=catalog.dto.js.map