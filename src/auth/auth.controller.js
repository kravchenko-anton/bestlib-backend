"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./dto/auth.dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleSign(dto) {
        return this.authService.googleSign(dto);
    }
    async mailRegister(dto) {
        return this.authService.register(dto);
    }
    async mailLogin(dto) {
        return this.authService.login(dto);
    }
    async refreshToken(dto) {
        return this.authService.refresh(dto.refreshToken);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('/google-sign'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return access and refresh token',
        type: auth_dto_1.AuthOutput
    }),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.GoogleAuthDto,
        description: 'Sign in with google account'
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [auth_dto_1.GoogleAuthDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "googleSign", null);
tslib_1.__decorate([
    (0, common_1.Post)('/mail-register'),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.AuthDto,
        description: 'Register new user'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return access and refresh token',
        type: auth_dto_1.AuthOutput
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "mailRegister", null);
tslib_1.__decorate([
    (0, common_1.Post)('/mail-login'),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.AuthDto,
        description: 'Login user'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return access and refresh token',
        type: auth_dto_1.AuthOutput
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "mailLogin", null);
tslib_1.__decorate([
    (0, common_1.Post)('/refresh'),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.RefreshDto,
        description: 'Refresh access token'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return access token',
        type: auth_dto_1.AuthOutput
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [auth_dto_1.RefreshDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('🔐 auth'),
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map