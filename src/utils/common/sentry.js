"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryFilter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const Sentry = tslib_1.__importStar(require("@sentry/node"));
let SentryFilter = class SentryFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        Sentry.captureException(exception);
        super.catch(exception, host);
    }
};
exports.SentryFilter = SentryFilter;
exports.SentryFilter = SentryFilter = tslib_1.__decorate([
    (0, common_1.Catch)()
], SentryFilter);
//# sourceMappingURL=sentry.js.map