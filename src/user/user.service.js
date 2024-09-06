"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const user_fields_1 = require("./user.fields");
const statisticReduce_service_1 = require("../utils/services/statisticReduce.service");
const common_1 = require("@nestjs/common");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const return_default_object_1 = require("../utils/common/return.default.object");
const server_error_1 = require("../utils/helpers/server-error");
const prisma_service_1 = require("../utils/services/prisma.service");
const return_user_object_1 = require("./return.user.object");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserById(id, selectObject = {}) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                ...return_user_object_1.returnUserObject,
                ...selectObject
            }
        });
        if (!user) {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Something went wrong');
        }
        return user;
    }
    async syncHistory(dto, userId) {
        if (dto.length === 0)
            return;
        await this.prisma.readingHistory.createMany({
            skipDuplicates: true,
            data: dto.map(history => ({
                readingTimeMs: history.readingTimeMs,
                endDate: (0, dayjs_1.default)(history.endDate).utc().toDate(),
                progressDelta: history.progressDelta,
                startProgress: history.startProgress,
                endProgress: history.endProgress,
                scrollPosition: history.scrollPosition,
                startDate: (0, dayjs_1.default)(history.startDate).utc().toDate(),
                userId: userId,
                bookId: history.bookId
            }))
        });
    }
    async adjustGoal(userId, goal) {
        if (goal % 10 !== 0 || goal < 10 || goal > 180)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Invalid goal');
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                goalMinutes: goal
            }
        });
    }
    async userStatistics(userId) {
        //TODO: сделать тут нормалный sql запрос на получение истории
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                goalMinutes: true
            }
        });
        if (!user)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "User doesn't exist");
        const userHistory = await this.prisma.readingHistory.findMany({
            where: { userId },
            select: {
                id: true,
                endDate: true,
                progressDelta: true,
                readingTimeMs: true,
                startDate: true
            }
        });
        //TODO: сделать по нормальному
        return {
            userSteak: 1,
            pepTalk: 'ads',
            progressByCurrentWeek: [],
            goalMinutes: user.goalMinutes
        };
    }
    async library(userId) {
        const library = await this.prisma.user.findUnique((0, user_fields_1.userLibraryFields)(userId));
        if (!library)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "User doesn't exist");
        const { readingBooks, finishedBooks, savedBooks } = library;
        return {
            readingBooks: readingBooks
                .map(book => {
                const latestHistory = book.readingHistory[0] ?? null;
                return {
                    ...book,
                    readingHistory: {
                        scrollPosition: latestHistory?.scrollPosition ?? 0,
                        endDate: latestHistory?.endDate,
                        progress: latestHistory?.endProgress ?? 0
                    }
                };
            })
                .sort((a, b) => (b.readingHistory?.endDate?.getTime() ?? 0) -
                (a.readingHistory?.endDate?.getTime() ?? 0)),
            finishedBooks,
            savedBooks
        };
    }
    async catalog(searchTerm, page) {
        const perPage = 20;
        const data = await this.prisma.user.findMany((0, user_fields_1.userCatalogFields)({ page, perPage, searchTerm }));
        const userCount = await this.prisma.user.count();
        return {
            data: data.map(({ readingHistory, ...user }) => ({
                ...user,
                statistics: (0, statisticReduce_service_1.statisticReduce)({
                    statistics: readingHistory.map(({ book, ...history }) => ({
                        ...history,
                        pagesCount: book.pagesCount
                    })),
                    initialDate: user.createdAt
                })
            })),
            canLoadMore: page < Math.floor(userCount / perPage),
            totalPages: Math.floor(userCount / perPage)
        };
    }
    async remove(id) {
        const user = await this.getUserById(id);
        await this.prisma.user.delete({
            where: { id: user.id }
        });
    }
    async startReading(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.getUserById(userId, {
            readingBooks: return_default_object_1.slugSelect,
            finishedBooks: return_default_object_1.slugSelect
        });
        const isReadingExist = user.readingBooks.some(book => book.slug === slug);
        if (isReadingExist)
            return;
        await this.prisma.user.update({
            where: { id: user.id },
            data: (0, user_fields_1.userStartReadingBookFields)(slug)
        });
    }
    async removeFromLibrary(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.getUserById(userId, {
            readingBooks: return_default_object_1.slugSelect,
            finishedBooks: return_default_object_1.slugSelect,
            savedBooks: return_default_object_1.slugSelect
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: (0, user_fields_1.userRemoveFromLibraryFields)(slug)
        });
    }
    async finishReading(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.getUserById(userId, {
            readingBooks: return_default_object_1.slugSelect
        });
        const isReadingExist = user.readingBooks.some(book => book.slug === slug);
        if (!isReadingExist)
            return;
        await this.prisma.user.update({
            where: { id: user.id },
            data: (0, user_fields_1.userFinishReadingBookFields)(slug)
        });
    }
    async toggleSave(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                savedBooks: return_default_object_1.slugSelect
            }
        });
        if (!user)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "User doesn't exist");
        const isSavedExist = user.savedBooks.some(book => book.slug === slug);
        await this.prisma.user.update({
            where: { id: user.id },
            data: (0, user_fields_1.userToggleSaveFields)({
                slug,
                isSavedExist
            })
        });
        return !isSavedExist;
    }
    async checkBookExist(slug) {
        const book = await this.prisma.book.findUnique({
            where: { slug, isPublic: true },
            select: {
                id: true,
                title: true
            }
        });
        if (!book)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Something went wrong');
        return !!book;
    }
    async isSaved(userId, slug) {
        await this.checkBookExist(slug);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                savedBooks: return_default_object_1.slugSelect
            }
        });
        if (!user)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        return user.savedBooks.some(book => book.slug === slug);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map