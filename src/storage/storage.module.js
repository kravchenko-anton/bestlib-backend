"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const storage_controller_1 = require("./storage.controller");
const storage_service_1 = require("./storage.service");
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [storage_controller_1.StorageController],
        providers: [storage_service_1.StorageService],
        imports: [config_1.ConfigModule],
        exports: [storage_service_1.StorageService]
    })
], StorageModule);
//# sourceMappingURL=storage.module.js.map