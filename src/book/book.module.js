"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const storage_service_1 = require("../storage/storage.service");
const prisma_service_1 = require("../utils/services/prisma.service");
const book_controller_1 = require("./book.controller");
const book_service_1 = require("./book.service");
let BookModule = class BookModule {
};
exports.BookModule = BookModule;
exports.BookModule = BookModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [book_controller_1.BookController],
        providers: [book_service_1.BookService, prisma_service_1.PrismaService, storage_service_1.StorageService],
        exports: [book_service_1.BookService]
    })
], BookModule);
//# sourceMappingURL=book.module.js.map