"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const tslib_1 = require("tslib");
const return_book_object_1 = require("../book/return.book.object");
const catalog_fields_1 = require("./catalog.fields");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const cacheManagerType = tslib_1.__importStar(require("cache-manager"));
const recommendation_service_1 = require("../recommendation/recommendation.service");
const prisma_service_1 = require("../utils/services/prisma.service");
let CatalogService = class CatalogService {
    constructor(prisma, recommendationService, cacheManager) {
        this.prisma = prisma;
        this.recommendationService = recommendationService;
        this.cacheManager = cacheManager;
    }
    search(query) {
        return this.prisma.book.findMany({
            where: (0, catalog_fields_1.catalogSearchFields)(query),
            select: return_book_object_1.returnBookObject
        });
    }
    async featured(userId) {
        const alreadyUsedBookSlugs = [];
        const pushBooks = (books) => {
            alreadyUsedBookSlugs.push(...books.map(book => book.id));
            return books;
        };
        const userSelectedGenres = await this.recommendationService.userSelectedGenresById(userId);
        const booksBySelectedGenres = userSelectedGenres.map(genre => this.prisma.book.findMany({
            take: 10,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            where: {
                isPublic: true,
                genres: {
                    some: {
                        id: genre.id
                    }
                },
                slug: {
                    notIn: alreadyUsedBookSlugs
                }
            }
        }));
        return {
            picksOfWeek: await this.picksOfTheWeek(alreadyUsedBookSlugs).then(pushBooks),
            genres: await this.prisma.genre.findMany({}),
            bestSellingBooks: await this.bestSellersBooks(alreadyUsedBookSlugs).then(pushBooks),
            newReleases: await this.newReleases(alreadyUsedBookSlugs).then(pushBooks),
            booksBySelectedGenres: await Promise.all(booksBySelectedGenres)
        };
    }
    async picksOfTheWeek(skippedBookSlugs = []) {
        const picksOfTheWeek = await this.cacheManager.get('picksOfTheWeek');
        if (picksOfTheWeek)
            return picksOfTheWeek;
        const picks = await this.prisma.book.findMany({
            take: 10,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            where: {
                isPublic: true,
                slug: {
                    notIn: skippedBookSlugs
                }
            }
        });
        const timeToSave = 60 * 60 * 24 * 7; // 1 week
        await this.cacheManager.set('picksOfTheWeek', picks, timeToSave);
        return picks;
    }
    bestSellersBooks(skippedBookSlugs = []) {
        return this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true,
                slug: {
                    notIn: skippedBookSlugs
                }
            },
            orderBy: {
                rating: 'desc'
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }
    newReleases(skippedBookSlugs = []) {
        return this.prisma.book.findMany({
            take: 10,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            where: {
                isPublic: true,
                slug: {
                    notIn: skippedBookSlugs
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService,
        recommendation_service_1.RecommendationService, Object])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map