import { PrismaService } from '@/src/utils/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReactionPayload } from 'src/reaction/reaction.dto';

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
		if (
			dto.create.length > 0 ||
			dto.update.length > 0 ||
			dto.delete.length > 0
		) {
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
		}
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
		//TODO: сделать проверку на то, есть ли всё эти реакции и убрать те, которых нет
		return reactions;
	}
}
