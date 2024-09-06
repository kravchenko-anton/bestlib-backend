"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionService = void 0;
const tslib_1 = require("tslib");
const server_error_1 = require("../utils/helpers/server-error");
const prisma_service_1 = require("../utils/services/prisma.service");
const common_1 = require("@nestjs/common");
let ReactionService = class ReactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createReactionDto) {
        const reactionsInXpath = await this.prisma.reaction.findMany({
            where: {
                userId,
                xpath: createReactionDto.xpath,
                bookId: createReactionDto.bookId
            }
        });
        for (const reaction of reactionsInXpath) {
            if ((reaction.startOffset <= createReactionDto.startOffset &&
                reaction.endOffset >= createReactionDto.startOffset) ||
                (reaction.startOffset <= createReactionDto.endOffset &&
                    reaction.endOffset >= createReactionDto.endOffset)) {
                throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Reaction already exists in this range');
            }
        }
        return this.prisma.reaction.create({
            data: {
                userId,
                bookId: createReactionDto.bookId,
                type: createReactionDto.type,
                description: createReactionDto.description,
                text: createReactionDto.text,
                xpath: createReactionDto.xpath,
                startOffset: createReactionDto.startOffset,
                endOffset: createReactionDto.endOffset
            }
        });
    }
    async update(userId, updateReactionDto) {
        const reaction = await this.prisma.reaction.findUnique({
            where: { id: updateReactionDto.id }
        });
        if (!reaction) {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Reaction doesn't exist");
        }
        return this.prisma.reaction.update({
            where: {
                userId: userId,
                id: updateReactionDto.id
            },
            data: updateReactionDto
        });
    }
    async reactionByBook(booId, userId) {
        return this.prisma.reaction.findMany({
            where: {
                id: booId,
                userId,
                book: {
                    isPublic: true
                }
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                endOffset: true,
                startOffset: true,
                xpath: true,
                type: true
            }
        });
    }
    async reactionList(userId) {
        const reactionsCount = await this.prisma.reaction.groupBy({
            by: ['bookId'],
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            where: {
                userId,
                book: {
                    isPublic: true
                }
            }
        });
        const booIds = reactionsCount.map(reaction => reaction.bookId);
        const books = await this.prisma.book.findMany({
            where: {
                slug: {
                    in: booIds
                },
                isPublic: true
            },
            select: {
                picture: true,
                title: true,
                slug: true,
                author: true
            }
        });
        return reactionsCount.map(reaction => {
            const book = books.find(book => book.slug === reaction.bookId);
            if (!book)
                return null;
            return {
                ...book,
                count: reaction._count.id
            };
        });
    }
    async remove(id, userId) {
        const reactionById = await this.prisma.reaction.findUnique({
            where: { id }
        });
        if (!reactionById) {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Reaction doesn't exist");
        }
        return this.prisma.reaction.delete({
            where: {
                id,
                userId
            }
        });
    }
};
exports.ReactionService = ReactionService;
exports.ReactionService = ReactionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReactionService);
//# sourceMappingURL=reaction.service.js.map