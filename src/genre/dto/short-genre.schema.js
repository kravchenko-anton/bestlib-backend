"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortGenreSchema = void 0;
const zod_1 = require("zod");
exports.ShortGenreSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    icon: zod_1.z.string(),
    emoji: zod_1.z.string()
});
//# sourceMappingURL=short-genre.schema.js.map