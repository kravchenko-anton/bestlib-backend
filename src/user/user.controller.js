"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async library(userId, dto) {
        await this.usersService.syncHistory(dto, userId);
        return this.usersService.library(userId);
    }
    async syncHistory(userId, dto) {
        await this.usersService.syncHistory(dto, userId);
    }
    async statistics(userId, dto) {
        await this.usersService.syncHistory(dto, userId);
        return this.usersService.userStatistics(userId);
    }
    async adjustGoal(userId, goal) {
        return this.usersService.adjustGoal(userId, Number(goal) || 0);
    }
    async startReading(userId, slug) {
        return this.usersService.startReading(userId, slug);
    }
    async finishReading(userId, slug) {
        return this.usersService.finishReading(userId, slug);
    }
    async removeFromLibrary(userId, slug) {
        return this.usersService.removeFromLibrary(userId, slug);
    }
    async toggleSave(userId, slug) {
        return this.usersService.toggleSave(userId, slug);
    }
    async isSaved(userId, slug) {
        return this.usersService.isSaved(userId, slug);
    }
    // admin
    async catalog(searchTerm, cursor) {
        return this.usersService.catalog(searchTerm || '', cursor);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)('/library'),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserLibraryOutput }),
    (0, swagger_1.ApiBody)({ type: [user_dto_1.ReadingHistory] }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "library", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)('/sync-history'),
    (0, swagger_1.ApiBody)({ type: [user_dto_1.ReadingHistory] }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "syncHistory", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)('/statistics'),
    (0, swagger_1.ApiBody)({ type: [user_dto_1.ReadingHistory] }),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserStatistics }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "statistics", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)('/adjust-goal'),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Query)('goal')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "adjustGoal", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)('/start-reading/:slug'),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "startReading", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)('/finish-reading/:slug'),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "finishReading", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)('/remove-from-library/:slug'),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "removeFromLibrary", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)('/toggle-save/:slug'),
    (0, swagger_1.ApiOkResponse)({ type: Boolean }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "toggleSave", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/is-saved/:slug'),
    (0, swagger_1.ApiOkResponse)({ type: Boolean }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Param)('slug')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "isSaved", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Get)('admin/catalog'),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserCatalogOutput }),
    tslib_1.__param(0, (0, common_1.Query)('searchTerm')),
    tslib_1.__param(1, (0, common_1.Query)('cursor')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "catalog", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Delete)('admin/remove/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('👤 user'),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map