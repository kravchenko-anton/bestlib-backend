import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/services/prisma.service';
import type { UpdateRecommendationDto } from './recommendation.dto';

@Injectable()
export class RecommendationService {
	constructor(private prisma: PrismaService) {}

	async userSelectedGenresById(userId: string) {
		const userSelectedGenres = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				selectedGenres: true
			}
		});
		return userSelectedGenres?.selectedGenres || [];
	}

	async updateSelectedGenres(id: string, dto: UpdateRecommendationDto) {
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
}
