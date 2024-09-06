"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateText = exports.GptExplain = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const gpt_explain_schema_1 = require("./dto/gpt-explain.schema");
const translate_schema_1 = require("./dto/translate.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class GptExplain extends (0, zod_nestjs_1.createZodDto)(gpt_explain_schema_1.GptExplainSchema) {
}
exports.GptExplain = GptExplain;
class TranslateText extends (0, zod_nestjs_1.createZodDto)(translate_schema_1.TranslateTextSchema) {
}
exports.TranslateText = TranslateText;
//# sourceMappingURL=reading.dto.js.map