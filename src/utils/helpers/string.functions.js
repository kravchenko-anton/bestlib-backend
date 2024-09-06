"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeFilename = optimizeFilename;
function optimizeFilename(filename) {
    // Split the filename and extension
    const [name, extension] = filename.split(/\.(?=[^.]+$)/);
    if (!name || !extension)
        return filename;
    const optimizedName = name
        .replaceAll(/[^\s\w-]/g, '')
        .trim()
        .replaceAll(/\s+/g, '-')
        .replaceAll(/-+/g, '-') || 'file';
    // Combine the optimized filename and the original extension
    return `${optimizedName}.${extension}`;
}
//# sourceMappingURL=string.functions.js.map