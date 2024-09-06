"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogSearchFields = void 0;
/* eslint-disable unicorn/prefer-spread */
const client_1 = require("@prisma/client");
const catalogSearchFields = (query) => client_1.Prisma.validator()({
    isPublic: true,
    OR: Array.from([
        {
            title: {
                mode: 'insensitive',
                contains: query
            }
        }
    ])
});
exports.catalogSearchFields = catalogSearchFields;
//# sourceMappingURL=catalog.fields.js.map