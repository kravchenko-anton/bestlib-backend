"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = void 0;
const common_1 = require("@nestjs/common");
const serverError = (code, message) => new common_1.HttpException({
    status: code,
    message
}, code);
exports.serverError = serverError;
//# sourceMappingURL=server-error.js.map