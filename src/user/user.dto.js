"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLibraryOutput = exports.UserCatalogOutput = exports.UserStatistics = exports.ReadingHistory = exports.User = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const user_schema_1 = require("./user.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class User extends (0, zod_nestjs_1.createZodDto)(user_schema_1.UserSchema) {
}
exports.User = User;
class ReadingHistory extends (0, zod_nestjs_1.createZodDto)(user_schema_1.HistorySchema) {
}
exports.ReadingHistory = ReadingHistory;
class UserStatistics extends (0, zod_nestjs_1.createZodDto)(user_schema_1.UserStatisticsSchema) {
}
exports.UserStatistics = UserStatistics;
class UserCatalogOutput extends (0, zod_nestjs_1.createZodDto)(user_schema_1.UserCatalogOutputSchema) {
}
exports.UserCatalogOutput = UserCatalogOutput;
class UserLibraryOutput extends (0, zod_nestjs_1.createZodDto)(user_schema_1.UserLibraryOutputSchema) {
}
exports.UserLibraryOutput = UserLibraryOutput;
//# sourceMappingURL=user.dto.js.map