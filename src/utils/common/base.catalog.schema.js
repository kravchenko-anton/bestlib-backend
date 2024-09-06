"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCatalogSchema = void 0;
const zod_1 = require("zod");
exports.BaseCatalogSchema = zod_1.z.object({
    canLoadMore: zod_1.z.boolean(),
    totalPages: zod_1.z.number()
});
//# sourceMappingURL=base.catalog.schema.js.map