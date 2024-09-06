"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../utils/services/prisma.service");
const genre_controller_1 = require("./genre.controller");
const genre_service_1 = require("./genre.service");
let GenreModule = class GenreModule {
};
exports.GenreModule = GenreModule;
exports.GenreModule = GenreModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [genre_controller_1.GenreController],
        providers: [genre_service_1.GenreService, prisma_service_1.PrismaService],
        exports: [genre_service_1.GenreService]
    })
], GenreModule);
//# sourceMappingURL=genre.module.js.map