"use strict";
import { AdminModule } from './admin/admin.module';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const env_config_1 = require("./utils/config/env-config");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const nestjs_prisma_1 = require("nestjs-prisma");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const book_module_1 = require("./book/book.module");
const ebook_module_1 = require("./book/ebook/ebook.module");
const catalog_module_1 = require("./catalog/catalog.module");
const genre_module_1 = require("./genre/genre.module");
const health_module_1 = require("./health/health.module");
const reaction_module_1 = require("./reaction/reaction.module");
const recommendation_module_1 = require("./recommendation/recommendation.module");
const storage_module_1 = require("./storage/storage.module");
const user_module_1 = require("./user/user.module");
const logger_1 = require("./utils/logger/logger");
const reading_module_1 = require("./reading/reading.module");
const author_module_1 = require("./author/author.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_1.AppLoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            catalog_module_1.CatalogModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: config => env_config_1.envConfigSchema.parse(config)
            }),
            genre_module_1.GenreModule,
            book_module_1.BookModule,
            auth_module_1.AuthModule,
            storage_module_1.StorageModule,
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                max: 1000,
                ttl: 60
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60,
                    limit: 10
                }
            ]),
            recommendation_module_1.RecommendationModule,
            health_module_1.HealthModule,
            ebook_module_1.EbookModule,
            reaction_module_1.ReactionModule,
            reading_module_1.ReadingModule,
            author_module_1.AuthorModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, (0, nestjs_prisma_1.providePrismaClientExceptionFilter)()]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map