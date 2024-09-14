"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReactionSchema = void 0;
const zod_1 = require("zod");
exports.CreateReactionSchema = zod_1.z.object({
    bookId: zod_1.z.string(),
    type: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    text: zod_1.z.string(),
    xpath: zod_1.z.string(),
    startOffset: zod_1.z.number(),
    endOffset: zod_1.z.number()
});
//# sourceMappingURL=create.reaction.schema.js.map