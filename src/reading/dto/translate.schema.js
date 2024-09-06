"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateTextSchema = void 0;
const zod_1 = require("zod");
exports.TranslateTextSchema = zod_1.z.object({
    targetLang: zod_1.z.string(),
    text: zod_1.z.string(),
    context: zod_1.z.string()
});
//# sourceMappingURL=translate.schema.js.map