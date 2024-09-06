"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../utils/services/prisma.service");
const recommendation_controller_1 = require("./recommendation.controller");
const recommendation_service_1 = require("./recommendation.service");
let RecommendationModule = class RecommendationModule {
};
exports.RecommendationModule = RecommendationModule;
exports.RecommendationModule = RecommendationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [recommendation_controller_1.RecommendationController],
        providers: [recommendation_service_1.RecommendationService, prisma_service_1.PrismaService]
    })
], RecommendationModule);
//# sourceMappingURL=recommendation.module.js.map