import { userCatalogFields } from '@/src/user/user.fields';
import { serverError } from '@/src/utils/helpers/server-error';
import type { PrismaService } from '@/src/utils/services/prisma.service';
import { statisticReduce } from '@/src/utils/services/statisticReduce.service';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}
	async catalog(searchTerm: string, page: number) {
		console.log('catalog called with:', searchTerm, page);
		const perPage = 20;
		const data = await this.prisma.user.findMany(
			userCatalogFields({ page, perPage, searchTerm })
		);
		const userCount = await this.prisma.user.count();

		const result = {
			data: data.map(user => ({
				...user,
				statistics: statisticReduce({
					statistics: user.readingHistory.map(history => ({ ...history })),
					initialDate: user.createdAt
				})
			})),
			canLoadMore: page < Math.floor(userCount / perPage),
			totalPages: Math.ceil(userCount / perPage)
		};
		console.log('catalog result:', result);
		return result;
	}

	async remove(userId: string) {
		console.log('remove called with:', userId);
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { id: true }
		});
		if (!user) {
			console.error('getUserById error: Something went wrong');
			throw serverError(HttpStatus.BAD_REQUEST, 'Something went wrong');
		}
		await this.prisma.user.delete({ where: { id: user.id } });
		console.log('remove completed for userId:', userId);
	}
}
