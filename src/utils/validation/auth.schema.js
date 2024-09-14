"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshSchema = exports.AuthOutputSchema = exports.AuthUserSchema = exports.GoogleAuthSchema = exports.AuthSchema = exports.Role = void 0;
const zod_1 = require("zod");
exports.Role = {
    user: 'user',
    admin: 'admin'
};
exports.AuthSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.GoogleAuthSchema = zod_1.z.object({
    socialId: zod_1.z.string()
});
exports.AuthUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    role: zod_1.z.nativeEnum(exports.Role)
});
exports.AuthOutputSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
    type: zod_1.z.string().optional(),
    user: exports.AuthUserSchema
});
exports.RefreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string()
});
//# sourceMappingURL=auth.schema.js.map