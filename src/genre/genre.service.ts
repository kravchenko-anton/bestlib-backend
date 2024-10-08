import type { Book } from '@/src/book/book.dto';
import { FindOneGenreOutput, ShortGenre } from '@/src/genre/genre.dto';
import { cacheKeys } from '@/src/utils/common/cacheManagerKeys';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import { returnBookObject } from '../book/return.book.object';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import { ReturnGenreObject } from './return.genre.object';

@Injectable()
export class GenreService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}
	async catalog() {
		const cachedCatalog = await this.cacheManager.get(cacheKeys.genreCatalog);
		if (cachedCatalog) {
			console.log('Returning cached genre catalog');
			return cachedCatalog as ShortGenre[];
		}

		const genreCatalog = this.prisma.genre.findMany({
			select: ReturnGenreObject
		});
		await this.cacheManager.set(cacheKeys.genreCatalog, genreCatalog, 60 * 60);

		return genreCatalog;
	}

	async byId(genreId: string) {
		const cachedGenre = await this.cacheManager.get(
			cacheKeys.genreById(genreId)
		);
		if (cachedGenre) {
			console.log('Returning cached genre:', genreId);
			return cachedGenre as FindOneGenreOutput;
		}

		const genre = await this.prisma.genre.findUnique({
			where: {
				id: genreId
			},
			select: {
				...ReturnGenreObject,
				books: {
					select: returnBookObject,
					where: {
						isPublic: true
					}
				}
			}
		});

		if (!genre)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");

		await this.cacheManager.set(cacheKeys.genreById(genreId), genre, 60 * 60);

		return genre;
	}

	async getGenresWithMain(genres: Book['genres']) {
		console.log('BookService.getGenres called with genres:', genres);
		const mainGenre = await this.prisma.genre.findFirst({
			where: {
				id: {
					in: genres.map(genre => genre.id)
				}
			},
			select: {
				id: true
			},
			orderBy: {
				mainBooks: {
					_count: 'asc'
				}
			}
		});
		if (genres.length < 2 || !mainGenre)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		const response = {
			mainGenreId: mainGenre.id,
			genreIds: genres.map(({ id }) => ({ id }))
		};
		console.log('BookService.getGenres response:', response);
		return response;
	}
}
