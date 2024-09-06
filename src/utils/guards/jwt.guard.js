"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockJwtGuard = exports.JwtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JwtGuard extends (0, passport_1.AuthGuard)('jwt') {
}
exports.JwtGuard = JwtGuard;
class MockJwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate() {
        return true;
    }
}
exports.MockJwtGuard = MockJwtGuard;
//# sourceMappingURL=jwt.guard.js.map