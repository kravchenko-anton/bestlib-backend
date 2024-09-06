"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../../utils/guards/admin.guard");
const jwt_guard_1 = require("../../utils/guards/jwt.guard");
const Auth = (role = 'user') => (0, common_1.applyDecorators)(role === 'admin' ? (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard) : (0, common_1.UseGuards)(jwt_guard_1.JwtGuard));
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map