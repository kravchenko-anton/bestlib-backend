import { cacheKeys } from '@/src/utils/common/cacheManagerKeys';
import { serverError } from '@/src/utils/helpers/server-error';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import { AuthorDto } from 'src/author/author.dto';

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
}
