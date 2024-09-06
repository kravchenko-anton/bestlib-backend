"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBookObject = void 0;
exports.returnBookObject = {
    id: true,
    title: true,
    picture: true,
    author: {
        select: {
            id: true,
            name: true
        }
    },
    rating: true
};
//# sourceMappingURL=return.book.object.js.map