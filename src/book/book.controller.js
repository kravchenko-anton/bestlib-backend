"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const tslib_1 = require("tslib");
const book_dto_1 = require("./dto/book.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const book_service_1 = require("./book.service");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async infoBySlug(bookSlug) {
        return this.bookService.infoBySlug(bookSlug);
    }
    async adminInfoById(id) {
        return this.bookService.infoBySlugAdmin(id);
    }
    async catalog(searchTerm, page) {
        return this.bookService.catalog(searchTerm, page || 1);
    }
    async create(dto) {
        return this.bookService.create(dto);
    }
    async update(bookSlug, dto) {
        return this.bookService.update(bookSlug, dto);
    }
    async remove(slug) {
        return this.bookService.remove(slug);
    }
};
exports.BookController = BookController;
tslib_1.__decorate([
    (0, common_1.Get)('/info/by-slug/:slug'),
    (0, swagger_1.ApiOkResponse)({ type: book_dto_1.InfoBySlug }),
    tslib_1.__param(0, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "infoBySlug", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Get)('/admin-info/by-id/:id'),
    (0, swagger_1.ApiOkResponse)({ type: book_dto_1.FullBook }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "adminInfoById", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Get)('/admin/catalog'),
    (0, swagger_1.ApiOkResponse)({ type: book_dto_1.CatalogOutput }),
    tslib_1.__param(0, (0, common_1.Query)('searchTerm')),
    tslib_1.__param(1, (0, common_1.Query)('page')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "catalog", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Post)('admin/create'),
    (0, swagger_1.ApiOkResponse)({ type: undefined }),
    (0, swagger_1.ApiBody)({
        type: book_dto_1.CreateBookDto,
        description: 'Create book'
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [book_dto_1.CreateBookDto]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, swagger_1.ApiOkResponse)({ type: undefined }),
    (0, common_1.Put)('admin/update/:slug'),
    tslib_1.__param(0, (0, common_1.Param)('slug')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, book_dto_1.UpdateBookDto]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, swagger_1.ApiOkResponse)({ type: undefined }),
    (0, common_1.Delete)('admin/remove/:slug'),
    tslib_1.__param(0, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "remove", null);
exports.BookController = BookController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('📙 book'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('book'),
    tslib_1.__metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map