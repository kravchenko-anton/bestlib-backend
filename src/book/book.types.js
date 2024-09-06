"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookDtoExtended = void 0;
const swagger_1 = require("@nestjs/swagger");
const book_dto_1 = require("./dto/book.dto");
class UpdateBookDtoExtended extends (0, swagger_1.PickType)(book_dto_1.UpdateBookDto, [
    'title',
    'description',
    'isPublic',
    'picture',
    'rating'
]) {
}
exports.UpdateBookDtoExtended = UpdateBookDtoExtended;
//# sourceMappingURL=book.types.js.map