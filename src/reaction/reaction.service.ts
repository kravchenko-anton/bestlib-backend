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
		console.log(
			'ReactionService.syncReaction called with userId:',
			userId,
			'and dto:',
			dto
		);
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
		const reactions = await this.prisma.reaction.findMany({
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
		console.log('ReactionService.syncReaction response:', reactions);
		return reactions;
	}

	async create(userId: string, createReactionDto: CreateReaction) {
		console.log(
			'ReactionService.create called with userId:',
			userId,
			'and createReactionDto:',
			createReactionDto
		);
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
		//TODO: adding checking existing reaction in the ebook
		const newReaction = await this.prisma.reaction.create({
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
		console.log('ReactionService.create response:', newReaction);
		return newReaction;
	}

	async update(userId: string, updateReactionDto: UpdateReaction) {
		console.log(
			'ReactionService.update called with userId:',
			userId,
			'and updateReactionDto:',
			updateReactionDto
		);
		const reaction = await this.prisma.reaction.findUnique({
			where: { id: updateReactionDto.id }
		});
		if (!reaction) {
			throw serverError(HttpStatus.BAD_REQUEST, "Reaction doesn't exist");
		}
		const updatedReaction = await this.prisma.reaction.update({
			where: {
				userId: userId,
				id: updateReactionDto.id
			},
			data: updateReactionDto
		});
		console.log('ReactionService.update response:', updatedReaction);
		return updatedReaction;
	}

	async reactionByBook(booId: string, userId: string) {
		console.log(
			'ReactionService.reactionByBook called with booId:',
			booId,
			'and userId:',
			userId
		);
		const reactions = await this.prisma.reaction.findMany({
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
		console.log('ReactionService.reactionByBook response:', reactions);
		return reactions;
	}

	async reactionList(userId: string) {
		console.log('ReactionService.reactionList called with userId:', userId);
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
		const response = reactionsCount.map(reaction => {
			const book = books.find(book => book.id === reaction.bookId);
			if (!book) return null;
			return {
				...book,
				count: reaction._count.id
			};
		});
		console.log('ReactionService.reactionList response:', response);
		return response;
	}

	async remove(id: string, userId: string) {
		console.log(
			'ReactionService.remove called with id:',
			id,
			'and userId:',
			userId
		);
		const reactionById = await this.prisma.reaction.findUnique({
			where: { id }
		});
		if (!reactionById) {
			throw serverError(HttpStatus.BAD_REQUEST, "Reaction doesn't exist");
		}
		const deletedReaction = await this.prisma.reaction.delete({
			where: {
				id,
				userId
			}
		});
		console.log('ReactionService.remove response:', deletedReaction);
		return deletedReaction;
	}
}
