import { FindOneGenreOutput, ShortGenre } from '@/src/genre/genre.dto';
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
		const cachedCatalog = await this.cacheManager.get(`genre_catalog`);
		if (cachedCatalog) {
			console.log('Returning cached genre catalog');
			return cachedCatalog as ShortGenre[];
		}

		const genreCatalog = this.prisma.genre.findMany({
			select: ReturnGenreObject
		});
		await this.cacheManager.set(`genre_catalog`, genreCatalog, 60 * 60);

		return genreCatalog;
	}

	async byId(genreId: string) {
		const cachedGenre = await this.cacheManager.get(`genre_${genreId}`);
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

		await this.cacheManager.set(`genre_${genreId}`, genre, 60 * 60);

		return genre;
	}
}
