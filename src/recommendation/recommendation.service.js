"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const tslib_1 = require("tslib");
const return_genre_object_1 = require("../genre/return.genre.object");
const common_1 = require("@nestjs/common");
const server_error_1 = require("../utils/helpers/server-error");
const prisma_service_1 = require("../utils/services/prisma.service");
let RecommendationService = class RecommendationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async userSelectedGenresById(userId) {
        const userSelectedGenres = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                selectedGenres: {
                    select: return_genre_object_1.ReturnGenreObject
                }
            }
        });
        return userSelectedGenres?.selectedGenres || [];
    }
    async updateSelectedGenres(id, dto) {
        await this.checkUserExist(id);
        const selectedGenres = await this.prisma.genre.findMany({
            where: {
                id: {
                    in: dto.genreSlugs
                }
            },
            select: {
                id: true
            }
        });
        await this.prisma.user.update({
            where: { id },
            data: {
                selectedGenres: {
                    set: selectedGenres
                }
            }
        });
    }
    async checkUserExist(id) {
        const userExist = await this.prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true
            }
        });
        if (!userExist)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Something went wrong');
        return !!userExist;
    }
};
exports.RecommendationService = RecommendationService;
exports.RecommendationService = RecommendationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecommendationService);
//# sourceMappingURL=recommendation.service.js.map