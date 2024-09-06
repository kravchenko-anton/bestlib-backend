"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const author_service_1 = require("./author.service");
let AuthorController = class AuthorController {
    constructor(authorService) {
        this.authorService = authorService;
    }
};
exports.AuthorController = AuthorController;
exports.AuthorController = AuthorController = tslib_1.__decorate([
    (0, common_1.Controller)('author'),
    tslib_1.__metadata("design:paramtypes", [author_service_1.AuthorService])
], AuthorController);
//# sourceMappingURL=author.controller.js.map