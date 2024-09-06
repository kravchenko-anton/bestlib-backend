"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const core_1 = require("@nestjs/core");
const Sentry = tslib_1.__importStar(require("@sentry/node"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const nest_openapi_tools_1 = require("nest-openapi-tools");
const nestjs_prisma_1 = require("nestjs-prisma");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./utils/common/http-exception.filter");
const sentry_1 = require("./utils/common/sentry");
const open_api_config_1 = require("./utils/config/open-api.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableCors({});
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new zod_nestjs_1.ZodValidationPipe());
    await nest_openapi_tools_1.OpenApiNestFactory.configure(app, open_api_config_1.openApiConfig, open_api_config_1.typesGeneratorConfig);
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: 1,
        // Set sampling rate for profiling
        // This is relative to tracesSampleRate
        profilesSampleRate: 1
    }); // Sentry configuration
    app.useGlobalFilters(new sentry_1.SentryFilter(httpAdapter));
    app.useGlobalFilters(new nestjs_prisma_1.PrismaClientExceptionFilter(httpAdapter));
    await app.listen(process.env.PORT || 3000);
}
// run yarn add sharp --ignore-engines
// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
//# sourceMappingURL=main.js.map