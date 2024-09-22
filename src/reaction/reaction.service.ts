import { serverError } from '@/src/utils/helpers/server-error';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
	CreateReaction,
	ReactionPayload,
	UpdateReaction
} from 'src/reaction/reaction.dto';

@Injectable()
export class ReactionService {
	constructor(private readonly prisma: PrismaService) {}
	async syncReaction(userId: string, dto: ReactionPayload) {
		await this.prisma.$transaction(async prisma => {
			await prisma.reaction.createMany({
				data: dto.create.map(reaction => ({
					userId,
					...reaction
				}))
			});

			for (const reaction of dto.update) {
				await prisma.reaction.update({
					where: {
						id: reaction.id,
						userId
					},
					data: reaction.updateObject
				});
			}

			await prisma.reaction.deleteMany({
				where: {
					id: {
						in: dto.delete
					},
					userId
				}
			});
		});
		return this.prisma.reaction.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				text: true,
				createdAt: true,
				endOffset: true,
				startOffset: true,
				xpath: true,
				type: true,
				book: {
					select: {
						id: true,
						title: true,
						author: {
							select: {
								id: true,
								name: true
							}
						},
						picture: true
					}
				}
			}
		});
	}
	async create(userId: string, createReactionDto: CreateReaction) {
		const reactionsInXpath = await this.prisma.reaction.findMany({
			where: {
				userId,
				xpath: createReactionDto.xpath,
				bookId: createReactionDto.bookId
			}
		});
		for (const reaction of reactionsInXpath) {
			if (
				(reaction.startOffset <= createReactionDto.startOffset &&
					reaction.endOffset >= createReactionDto.startOffset) ||
				(reaction.startOffset <= createReactionDto.endOffset &&
					reaction.endOffset >= createReactionDto.endOffset)
			) {
				throw serverError(
					HttpStatus.BAD_REQUEST,
					'Reaction already exists in this range'
				);
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

	async update(userId: string, updateReactionDto: UpdateReaction) {
		const reaction = await this.prisma.reaction.findUnique({
			where: { id: updateReactionDto.id }
		});
		if (!reaction) {
			throw serverError(HttpStatus.BAD_REQUEST, "Reaction doesn't exist");
		}
		return this.prisma.reaction.update({
			where: {
				userId: userId,
				id: updateReactionDto.id
			},
			data: updateReactionDto
		});
	}

	async reactionByBook(booId: string, userId: string) {
		return this.prisma.reaction.findMany({
			where: {
				userId,
				book: {
					id: booId,
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

	async reactionList(userId: string) {
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
				id: {
					in: booIds
				},
				isPublic: true
			},
			select: {
				picture: true,
				id: true,
				title: true,
				author: true
			}
		});
		return reactionsCount.map(reaction => {
			const book = books.find(book => book.id === reaction.bookId);
			if (!book) return null;
			return {
				...book,
				count: reaction._count.id
			};
		});
	}

	async remove(id: string, userId: string) {
		const reactionById = await this.prisma.reaction.findUnique({
			where: { id }
		});
		if (!reactionById) {
			throw serverError(HttpStatus.BAD_REQUEST, "Reaction doesn't exist");
		}
		return this.prisma.reaction.delete({
			where: {
				id,
				userId
			}
		});
	}
}
