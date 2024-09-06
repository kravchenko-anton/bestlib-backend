"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const return_book_object_1 = require("../book/return.book.object");
const server_error_1 = require("../utils/helpers/server-error");
const prisma_service_1 = require("../utils/services/prisma.service");
const return_genre_object_1 = require("./return.genre.object");
let GenreService = class GenreService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    catalog() {
        return this.prisma.genre.findMany({
            select: return_genre_object_1.ReturnGenreObject
        });
    }
    async byId(genreId) {
        const genre = await this.prisma.genre.findUnique({
            where: {
                id: genreId
            },
            select: {
                ...return_genre_object_1.ReturnGenreObject,
                books: {
                    select: return_book_object_1.returnBookObject,
                    where: {
                        isPublic: true
                    }
                }
            }
        });
        if (!genre)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        return genre;
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GenreService);
//# sourceMappingURL=genre.service.js.map