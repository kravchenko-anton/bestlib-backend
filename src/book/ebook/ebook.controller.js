"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbookController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../auth/decorators/auth.decorator");
const ebook_dto_1 = require("./dto/ebook.dto");
const ebook_service_1 = require("./ebook.service");
let EbookController = class EbookController {
    constructor(ebookService) {
        this.ebookService = ebookService;
    }
    async ebookBySlug(bookSlug) {
        return this.ebookService.ebookBySlug(bookSlug);
    }
    //  admin
    async storedEbookBySlug(bookSlug) {
        return this.ebookService.storedEbook(bookSlug);
    }
};
exports.EbookController = EbookController;
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/ebook/by-slug/:slug'),
    (0, swagger_1.ApiOkResponse)({ type: ebook_dto_1.EbookOutput }),
    tslib_1.__param(0, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EbookController.prototype, "ebookBySlug", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Get)('/admin/stored-ebook/:slug'),
    (0, swagger_1.ApiOkResponse)({ type: [ebook_dto_1.StoredEBook] }),
    tslib_1.__param(0, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EbookController.prototype, "storedEbookBySlug", null);
exports.EbookController = EbookController = tslib_1.__decorate([
    (0, common_1.Controller)('ebook'),
    (0, swagger_1.ApiTags)('📙 ebook'),
    tslib_1.__metadata("design:paramtypes", [ebook_service_1.EbookService])
], EbookController);
//# sourceMappingURL=ebook.controller.js.map