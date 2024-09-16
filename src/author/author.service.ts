import { serverError } from '@/src/utils/helpers/server-error';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto, ShortAuthorDto } from 'src/author/author.dto';

@Injectable()
export class AuthorService {
	constructor(private readonly prisma: PrismaService) {}

	async byId(id: string) {
		console.log('try to get author by id', id);
		const author = await this.prisma.author.findUnique({
			where: {
				id
			},
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
			}
		});
		if (!author) throw serverError(HttpStatus.BAD_REQUEST, 'Author not found');
		return author;
	}

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
	update(dto: ShortAuthorDto) {
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
		return {
			data: authors,
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		};
	}
}
