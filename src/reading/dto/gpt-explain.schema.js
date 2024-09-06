"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptExplainSchema = void 0;
const zod_1 = require("zod");
exports.GptExplainSchema = zod_1.z.object({
    selectedText: zod_1.z.string(),
    context: zod_1.z.string(),
    bookTitle: zod_1.z.string()
});
//# sourceMappingURL=gpt-explain.schema.js.map