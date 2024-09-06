"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const storage_service_1 = require("../storage/storage.service");
const server_error_1 = require("../utils/helpers/server-error");
const prisma_service_1 = require("../utils/services/prisma.service");
const book_fields_1 = require("./book.fields");
const return_book_object_1 = require("./return.book.object");
const statisticReduce_service_1 = require("../utils/services/statisticReduce.service");
const get_ebook_1 = require("./helpers/get-ebook");
const html_validation_1 = require("../utils/common/html-validation");
const slugify_1 = require("../utils/helpers/slugify");
let BookService = class BookService {
    constructor(prisma, storageService) {
        this.prisma = prisma;
        this.storageService = storageService;
    }
    async infoBySlug(slug) {
        const book = await this.prisma.book.findUnique({
            where: { slug, isPublic: true },
            select: book_fields_1.infoBySlug
        });
        if (!book)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        return {
            ...book,
            fromSameAuthor: await this.prisma.book.findMany({
                where: {
                    isPublic: true,
                    author: {
                        id: book.author.id
                    },
                    id: {
                        not: book.id
                    }
                },
                select: return_book_object_1.returnBookObject
            })
        };
    }
    async infoBySlugAdmin(id) {
        const book = await this.prisma.book.findUnique({
            where: { id },
            select: (0, book_fields_1.infoBySlugAdminFields)(id)
        });
        if (!book)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        const { readingHistory = [], ...rest } = book;
        return {
            ...rest,
            statistics: (0, statisticReduce_service_1.statisticReduce)({
                statistics: readingHistory.map(statistics => ({
                    ...statistics,
                    pagesCount: book.pagesCount
                })),
                initialDate: book.createdAt,
                nowDate: true
            })
        };
    }
    async catalog(searchTerm, page) {
        const perPage = 20;
        const count = await this.prisma.book.count();
        return {
            data: await this.prisma.book.findMany((0, book_fields_1.bookCatalogFields)({ page, perPage, searchTerm })),
            canLoadMore: page < Math.floor(count / perPage),
            totalPages: Math.floor(count / perPage)
        };
    }
    async create(dto) {
        const { genreIds, mainGenreId } = await this.getGenres(dto.genres);
        const { readingTime, uploadedEbook, pagesCount, chaptersCount } = (0, get_ebook_1.useEbookCalculation)(dto.ebook);
        const { isValid, messages } = await (0, html_validation_1.checkHtmlValid)(uploadedEbook
            .map(book => book.chapters.map(chapter => `${chapter.text}`.trim()).join(''))
            .join(''));
        console.log('isValid', isValid);
        if (!isValid)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, messages);
        const { name: ebookName } = await this.storageService.upload({
            folder: 'ebooks',
            file: Buffer.from(JSON.stringify(uploadedEbook)),
            fileName: dto.title + '.json'
        });
        await this.prisma.book.create({
            data: (0, book_fields_1.bookCreateFields)({
                dto,
                genreIds,
                mainGenreId,
                ebookName,
                readingTime,
                chaptersCount,
                pagesCount
            })
        });
    }
    async remove(slug) {
        //TODO: сделать так, чтобы при удалении книги удалялись все статистики по ней
        await this.prisma.book.delete({ where: { slug } });
    }
    //TODO: переделать обновление  с такого на более лучшее
    async update(slug, dto) {
        const book = await this.prisma.book.findUnique({
            where: { slug },
            select: {
                id: true,
                title: true,
                ebook: true
            }
        });
        if (!book)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Book doesn't exist");
        const { genres, title, ebook, authorId, ...rest } = dto;
        let updateData = {
            ...rest
        };
        if (ebook) {
            const { uploadedEbook, readingTime, pagesCount, chaptersCount } = (0, get_ebook_1.useEbookCalculation)(ebook);
            const { isValid, messages } = await (0, html_validation_1.checkHtmlValid)(uploadedEbook
                .map(book => book.chapters.map(chapter => `${chapter.text}`.trim()).join(''))
                .join(''));
            if (!isValid)
                throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, messages);
            const { name: ebookName } = await this.storageService.upload({
                folder: 'ebooks',
                file: Buffer.from(JSON.stringify(uploadedEbook)),
                fileName: `${book.title}.json`
            });
            updateData = {
                ...updateData,
                ebook: ebookName,
                readingTime,
                pagesCount,
                chapters: chaptersCount
            };
        }
        if (genres) {
            const { genreIds, mainGenreId } = await this.getGenres(genres);
            updateData = {
                ...updateData,
                genres: {
                    set: genreIds
                },
                mainGenre: {
                    connect: {
                        id: mainGenreId
                    }
                }
            };
        }
        if (title) {
            updateData = {
                ...updateData,
                slug: (0, slugify_1.slugify)(title)
            };
        }
        if (authorId) {
            const author = await this.prisma.author.findUnique({
                where: { id: authorId }
            });
            if (!author)
                throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Author doesn't exist");
            updateData = {
                ...updateData,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            };
        }
        await this.prisma.book.update({
            where: { id: book.id },
            data: updateData
        });
    }
    async getGenres(genres) {
        const mainGenre = await this.prisma.genre.findFirst({
            where: {
                id: {
                    in: genres.map(genre => genre.id)
                }
            },
            select: {
                id: true
            },
            orderBy: {
                mainBooks: {
                    _count: 'asc'
                }
            }
        });
        if (genres.length < 2 || !mainGenre)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        return {
            mainGenreId: mainGenre.id,
            genreIds: genres.map(({ id }) => ({ id }))
        };
    }
};
exports.BookService = BookService;
exports.BookService = BookService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService,
        storage_service_1.StorageService])
], BookService);
//# sourceMappingURL=book.service.js.map