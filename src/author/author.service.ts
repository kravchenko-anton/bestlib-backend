import { cacheKeys } from '@/src/utils/common/cacheManagerKeys';
import { serverError } from '@/src/utils/helpers/server-error';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import {
	AuthorDto,
	CreateAuthorDto,
	ShortAuthorDto
} from 'src/author/author.dto';

@Injectable()
export class AuthorService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}
	async byId(id: string) {
		console.log('AuthorService.byId called with id:', id);

		const cachedAuthor = await this.cacheManager.get(cacheKeys.authorById(id));
		if (cachedAuthor) {
			console.log('Returning cached author:', id);
			return cachedAuthor as AuthorDto;
		}

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

		await this.cacheManager.set(cacheKeys.authorById(id), author, 60 * 60 * 24);

		console.log('AuthorService.byId response:', author);
		return author;
	}

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
