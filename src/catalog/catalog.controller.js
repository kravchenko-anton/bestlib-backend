"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const book_dto_1 = require("../book/dto/book.dto");
const catalog_dto_1 = require("./dto/catalog.dto");
const catalog_service_1 = require("./catalog.service");
let CatalogController = class CatalogController {
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    async search(query) {
        return this.catalogService.search(query);
    }
    async featured(userId) {
        return this.catalogService.featured(userId);
    }
    async picksOfTheWeek() {
        return this.catalogService.picksOfTheWeek();
    }
};
exports.CatalogController = CatalogController;
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/search/:query'),
    (0, swagger_1.ApiOkResponse)({ type: [book_dto_1.ShortBook] }),
    tslib_1.__param(0, (0, common_1.Param)('query')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogController.prototype, "search", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/featured'),
    (0, swagger_1.ApiOkResponse)({ type: catalog_dto_1.FeaturedOutput }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogController.prototype, "featured", null);
tslib_1.__decorate([
    (0, common_1.Get)('/picks-of-the-week'),
    (0, swagger_1.ApiOkResponse)({ type: [book_dto_1.ShortBook] }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogController.prototype, "picksOfTheWeek", null);
exports.CatalogController = CatalogController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('📚 catalog'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('catalog'),
    tslib_1.__metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
//# sourceMappingURL=catalog.controller.js.map