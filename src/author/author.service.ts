import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { AuthorDto, CreateAuthorDto } from '@/src/author/dto/author.dto';

@Injectable()
export class AuthorService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: Required<CreateAuthorDto>) {
		console.log('try to create author', dto);
		const { photo, ...rest } = dto;
		return this.prisma.author.create({
			data: {
				picture: photo,
				...rest
			}
		});
	}
	update(dto: AuthorDto) {
		console.log('try to update author', dto);
		return this.prisma.author.update({
			where: {
				id: dto.id
			},
			data: dto
		});
	}
	async delete(id: string) {
		console.log('try to delete author', id);
		return this.prisma.author.delete({
			where: {
				id
			}
		});
	}

	async catalog(searchTerm: string, page: number) {
		console.log('try to get author catalog', searchTerm, page);
		const perPage = 20;
		const count = await this.prisma.author.count();
		const authors = await this.prisma.author.findMany({
			select: {
				id: true,
				name: true,
				picture: true,
				description: true
			},
			take: perPage,
			...(page && {
				skip: page * perPage
			}),
			...(searchTerm && {
				where: {
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			})
		});
		return {
			data: authors,
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		};
	}
}
