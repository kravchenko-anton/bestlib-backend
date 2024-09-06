"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileUrl = void 0;
const getFileUrl = (path) => {
    if (path?.startsWith('http'))
        return path;
    return `https://f005.backblazeb2.com/file/Booknex/${path}`;
};
exports.getFileUrl = getFileUrl;
//# sourceMappingURL=get-file-url.js.map