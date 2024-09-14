"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadOutputDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const upload_schema_1 = require("./upload.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class UploadOutputDto extends (0, zod_nestjs_1.createZodDto)(upload_schema_1.UploadOutputSchema) {
}
exports.UploadOutputDto = UploadOutputDto;
//# sourceMappingURL=storage.dto.js.map