"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const genre_dto_1 = require("../genre/dto/genre.dto");
const recommendation_dto_1 = require("./recommendation.dto");
const recommendation_service_1 = require("./recommendation.service");
let RecommendationController = class RecommendationController {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;
    }
    async updateRecommendation(userId, dto) {
        return this.recommendationService.updateSelectedGenres(userId, dto);
    }
    async currentRecommendation(userId) {
        return this.recommendationService.userSelectedGenresById(userId);
    }
};
exports.RecommendationController = RecommendationController;
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)('/update-recommendation'),
    (0, swagger_1.ApiOkResponse)({ description: 'Recommendation updated' }),
    (0, swagger_1.ApiBody)({ type: recommendation_dto_1.UpdateRecommendationDto }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, recommendation_dto_1.UpdateRecommendationDto]),
    tslib_1.__metadata("design:returntype", Promise)
], RecommendationController.prototype, "updateRecommendation", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/recommendation-genre'),
    (0, swagger_1.ApiOkResponse)({
        type: [genre_dto_1.ShortGenre],
        description: 'Recommendation genres'
    }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RecommendationController.prototype, "currentRecommendation", null);
exports.RecommendationController = RecommendationController = tslib_1.__decorate([
    (0, common_1.Controller)('recommendation'),
    (0, swagger_1.ApiTags)('📨 recommendation'),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [recommendation_service_1.RecommendationService])
], RecommendationController);
//# sourceMappingURL=recommendation.controller.js.map