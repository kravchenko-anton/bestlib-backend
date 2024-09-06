"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const genre_service_1 = require("../genre/genre.service");
const recommendation_service_1 = require("../recommendation/recommendation.service");
const prisma_service_1 = require("../utils/services/prisma.service");
const catalog_controller_1 = require("./catalog.controller");
const catalog_service_1 = require("./catalog.service");
let CatalogModule = class CatalogModule {
};
exports.CatalogModule = CatalogModule;
exports.CatalogModule = CatalogModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [catalog_controller_1.CatalogController],
        providers: [
            catalog_service_1.CatalogService,
            prisma_service_1.PrismaService,
            genre_service_1.GenreService,
            recommendation_service_1.RecommendationService
        ]
    })
], CatalogModule);
//# sourceMappingURL=catalog.module.js.map