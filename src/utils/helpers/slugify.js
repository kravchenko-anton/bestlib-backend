"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
function slugify(input) {
    if (!input)
        return '';
    // make lower case and trim
    let slug = input.toLowerCase().trim();
    // remove accents from charaters
    slug = slug.normalize('NFD').replaceAll(/[\u0300-\u036F]/g, '');
    // replace invalid chars with spaces
    slug = slug.replaceAll(/[^\d\sa-z-]/g, ' ').trim();
    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replaceAll(/[\s-]+/g, '-');
    return slug;
}
//# sourceMappingURL=slugify.js.map