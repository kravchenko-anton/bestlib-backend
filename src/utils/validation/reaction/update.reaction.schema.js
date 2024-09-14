"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReactionSchema = void 0;
const zod_1 = require("zod");
exports.UpdateReactionSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    type: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    text: zod_1.z.string().optional(),
    xpath: zod_1.z.string().optional(),
    startOffset: zod_1.z.number().optional(),
    endOffset: zod_1.z.number().optional()
})
    .partial();
//# sourceMappingURL=update.reaction.schema.js.map