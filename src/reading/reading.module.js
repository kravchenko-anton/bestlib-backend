"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const reading_controller_1 = require("./reading.controller");
const reading_service_1 = require("./reading.service");
let ReadingModule = class ReadingModule {
};
exports.ReadingModule = ReadingModule;
exports.ReadingModule = ReadingModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [reading_controller_1.ReadingController],
        providers: [reading_service_1.ReadingService, nestjs_prisma_1.PrismaService]
    })
], ReadingModule);
//# sourceMappingURL=reading.module.js.map