"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionController = void 0;
const tslib_1 = require("tslib");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const reaction_dto_1 = require("./dto/reaction.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reaction_service_1 = require("./reaction.service");
let ReactionController = class ReactionController {
    constructor(reactionService) {
        this.reactionService = reactionService;
    }
    create(userId, dto) {
        return this.reactionService.create(userId, dto);
    }
    reactionList(userId) {
        return this.reactionService.reactionList(userId);
    }
    reactionByBook(id, userId) {
        return this.reactionService.reactionByBook(id, userId);
    }
    update(userId, dto) {
        return this.reactionService.update(userId, dto);
    }
    remove(id, userId) {
        return this.reactionService.remove(id, userId);
    }
};
exports.ReactionController = ReactionController;
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiBody)({ type: reaction_dto_1.CreateReaction }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, reaction_dto_1.CreateReaction]),
    tslib_1.__metadata("design:returntype", void 0)
], ReactionController.prototype, "create", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/reaction-list'),
    (0, swagger_1.ApiOkResponse)({ type: [reaction_dto_1.ReactionListOutput] }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ReactionController.prototype, "reactionList", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('/reaction-by-bookId/:id'),
    (0, swagger_1.ApiOkResponse)({ type: reaction_dto_1.ReactionByBookOutput, isArray: true }),
    tslib_1.__param(0, (0, common_1.Param)('bookSlug')),
    tslib_1.__param(1, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReactionController.prototype, "reactionByBook", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)('/update'),
    (0, swagger_1.ApiBody)({ type: reaction_dto_1.UpdateReaction }),
    tslib_1.__param(0, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, reaction_dto_1.UpdateReaction]),
    tslib_1.__metadata("design:returntype", void 0)
], ReactionController.prototype, "update", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Put)('/delete/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, user_decorator_1.CurrentUser)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ReactionController.prototype, "remove", null);
exports.ReactionController = ReactionController = tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('reaction'),
    (0, swagger_1.ApiTags)('👍 Reaction'),
    tslib_1.__metadata("design:paramtypes", [reaction_service_1.ReactionService])
], ReactionController);
//# sourceMappingURL=reaction.controller.js.map