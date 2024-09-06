"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDto = exports.RefreshDto = exports.GoogleAuthDto = exports.AuthOutput = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const auth_schema_1 = require("./auth.schema");
const zod_1 = require("zod");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class AuthOutput extends (0, zod_nestjs_1.createZodDto)(auth_schema_1.AuthOutputSchema) {
}
exports.AuthOutput = AuthOutput;
class GoogleAuthDto extends (0, zod_nestjs_1.createZodDto)(auth_schema_1.GoogleAuthSchema) {
}
exports.GoogleAuthDto = GoogleAuthDto;
class RefreshDto extends (0, zod_nestjs_1.createZodDto)(auth_schema_1.RefreshSchema) {
}
exports.RefreshDto = RefreshDto;
class AuthDto extends (0, zod_nestjs_1.createZodDto)(auth_schema_1.AuthSchema) {
}
exports.AuthDto = AuthDto;
//# sourceMappingURL=auth.dto.js.map