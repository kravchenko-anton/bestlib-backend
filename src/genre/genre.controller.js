"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const genre_dto_1 = require("./dto/genre.dto");
const genre_service_1 = require("./genre.service");
let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    async catalog() {
        return this.genreService.catalog();
    }
    async byId(genreId) {
        return this.genreService.byId(genreId);
    }
};
exports.GenreController = GenreController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: [genre_dto_1.ShortGenre] }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], GenreController.prototype, "catalog", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/by-id/:slug'),
    (0, swagger_1.ApiOkResponse)({ type: genre_dto_1.FindOneGenreOutput }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GenreController.prototype, "byId", null);
exports.GenreController = GenreController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('🔖 genre'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('genre'),
    tslib_1.__metadata("design:paramtypes", [genre_service_1.GenreService])
], GenreController);
//# sourceMappingURL=genre.controller.js.map