"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbookModule = void 0;
const tslib_1 = require("tslib");
const storage_service_1 = require("../../storage/storage.service");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../utils/services/prisma.service");
const ebook_controller_1 = require("./ebook.controller");
const ebook_service_1 = require("./ebook.service");
let EbookModule = class EbookModule {
};
exports.EbookModule = EbookModule;
exports.EbookModule = EbookModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [ebook_controller_1.EbookController],
        providers: [ebook_service_1.EbookService, prisma_service_1.PrismaService, storage_service_1.StorageService]
    })
], EbookModule);
//# sourceMappingURL=ebook.module.js.map