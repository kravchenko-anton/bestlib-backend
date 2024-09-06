"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AppLoggerMiddleware = class AppLoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        const { method, originalUrl } = request;
        const startAt = process.hrtime();
        response.on('finish', () => {
            const { statusCode } = response;
            const diff = process.hrtime(startAt);
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
            this.logger.log(`${method} ${originalUrl.replace('/api', '')} ${statusCode} ${responseTime.toFixed(2)}s`);
        });
        next();
    }
};
exports.AppLoggerMiddleware = AppLoggerMiddleware;
exports.AppLoggerMiddleware = AppLoggerMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppLoggerMiddleware);
//# sourceMappingURL=logger.js.map