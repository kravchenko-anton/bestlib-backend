"use strict";
import { BookModule } from './book/book.module';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const author_controller_1 = require("./author.controller");
const author_service_1 = require("./author.service");
let AuthorModule = class AuthorModule {
};
exports.AuthorModule = AuthorModule;
exports.AuthorModule = AuthorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [author_controller_1.AuthorController],
        providers: [author_service_1.AuthorService, nestjs_prisma_1.PrismaService]
    })
], AuthorModule);
//# sourceMappingURL=author.module.js.map