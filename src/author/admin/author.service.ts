import { CreateAuthorDto, ShortAuthorDto } from '@/src/author/author.dto';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: Required<CreateAuthorDto>) {
		console.log('AuthorService.create called with dto:', dto);
		const { photo, ...rest } = dto;
		const author = this.prisma.author.create({
			data: {
				picture: photo,
				...rest
			}
		});
		console.log('AuthorService.create created author:', author);
		return author;
	}

	update(dto: ShortAuthorDto) {
		console.log('AuthorService.update called with dto:', dto);
		const author = this.prisma.author.update({
			where: {
				id: dto.id
			},
			data: dto
		});
		console.log('AuthorService.update updated author:', author);
		return author;
	}

	async delete(id: string) {
		console.log('AuthorService.delete called with id:', id);
		const author = await this.prisma.author.delete({
			where: {
				id
			}
		});
		console.log('AuthorService.delete deleted author with id:', id);
		return author;
	}

	async catalog(searchTerm: string, page: number) {
		console.log(
			'AuthorService.catalog called with searchTerm:',
			searchTerm,
			'and page:',
			page
		);
		const perPage = 20;
		const count = await this.prisma.author.count();
		const authors = await this.prisma.author.findMany({
			select: {
				id: true,
				name: true,
				picture: true,
				description: true,
				books: {
					select: {
						id: true,
						title: true,
						picture: true,
						rating: true
					}
				}
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
		const response = {
			data: authors,
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		};
		console.log('AuthorService.catalog response:', response);
		return response;
	}
}
