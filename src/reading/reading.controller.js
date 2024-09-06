"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingController = void 0;
const tslib_1 = require("tslib");
const reading_dto_1 = require("./reading.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reading_service_1 = require("./reading.service");
let ReadingController = class ReadingController {
    constructor(readingService) {
        this.readingService = readingService;
    }
    gptExplain(dto) {
        return this.readingService.gptExplain(dto);
    }
    translate(dto) {
        return this.readingService.translateText(dto);
    }
};
exports.ReadingController = ReadingController;
tslib_1.__decorate([
    (0, common_1.Post)('/gpt-explain'),
    (0, swagger_1.ApiBody)({ type: reading_dto_1.GptExplain }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [reading_dto_1.GptExplain]),
    tslib_1.__metadata("design:returntype", void 0)
], ReadingController.prototype, "gptExplain", null);
tslib_1.__decorate([
    (0, common_1.Post)('/translate'),
    (0, swagger_1.ApiBody)({ type: reading_dto_1.TranslateText }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [reading_dto_1.TranslateText]),
    tslib_1.__metadata("design:returntype", void 0)
], ReadingController.prototype, "translate", null);
exports.ReadingController = ReadingController = tslib_1.__decorate([
    (0, common_1.Controller)('reading'),
    tslib_1.__metadata("design:paramtypes", [reading_service_1.ReadingService])
], ReadingController);
//# sourceMappingURL=reading.controller.js.map