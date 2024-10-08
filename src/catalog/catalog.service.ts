import { returnBookObject } from '@/src/book/return.book.object';
import type { FeaturedOutput } from '@/src/catalog/catalog.dto';
import { catalogSearchFields } from '@/src/catalog/catalog.fields';
import { GenreService } from '@/src/genre/genre.service';
import { cacheKeys } from '@/src/utils/common/cacheManagerKeys';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import type { ShortBook } from 'src/book/book.dto';
import { RecommendationService } from '../recommendation/recommendation.service';
import { PrismaService } from '../utils/services/prisma.service';

@Injectable()
export class CatalogService {
	timeToLive = 60 * 60 * 24;

	constructor(
		private readonly prisma: PrismaService,
		private readonly recommendationService: RecommendationService,
		private readonly genreService: GenreService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}

	search(query: string) {
		console.log('CatalogService.search called with query:', query);
		return this.prisma.book.findMany({
			where: catalogSearchFields(query),
			select: returnBookObject
		});
	}

	async featured(userId: string) {
		console.log('CatalogService.featured called with userId:', userId);
		const cachedResponse = await this.cacheManager.get<FeaturedOutput>(
			cacheKeys.featured(userId)
		);
		if (cachedResponse) {
			console.log('Featured response from cache:', cachedResponse);
			return cachedResponse;
		}

		const alreadyUsedBookId: Set<string> = new Set();

		const pushBooks = (books: ShortBook[]) => {
			for (const book of books) alreadyUsedBookId.add(book.id);
			return books;
		};

		const response = {
			picksOfWeek: await this.picksOfTheWeek([...alreadyUsedBookId]).then(
				pushBooks
			),
			genres: await this.genreService.catalog(),
			bestSellingBooks: await this.bestSellersBooks([
				...alreadyUsedBookId
			]).then(pushBooks),
			booksBySelectedGenres: await this.booksBySelectedGenres(userId, [
				...alreadyUsedBookId
			])
		};
		console.log('Featured response:', response);
		await this.cacheManager.set(
			cacheKeys.featured(userId),
			response,
			this.timeToLive
		);
		return response;
	}

	async picksOfTheWeek(skippedBookById: string[] = []) {
		console.log(
			'CatalogService.picksOfTheWeek called with skippedBookById:',
			skippedBookById
		);
		const picksOfTheWeek = await this.cacheManager.get<ShortBook[]>(
			cacheKeys.picksOfTheWeek
		);
		if (picksOfTheWeek) {
			console.log('Picks of the week from cache:', picksOfTheWeek);
			return picksOfTheWeek;
		}

		const picks = await this.prisma.book.findMany({
			take: 10,
			select: {
				id: true,
				title: true,
				picture: true,
				rating: true,
				author: {
					select: {
						id: true,
						name: true
					}
				}
			},
			where: {
				isPublic: true,
				id: {
					notIn: skippedBookById
				}
			}
		});
		console.log('Picks of the week from database:', picks);
		await this.cacheManager.set(
			cacheKeys.picksOfTheWeek,
			picks,
			this.timeToLive
		);
		return picks;
	}

	private async booksBySelectedGenres(
		userId: string,
		alreadyUsedBookId: string[] = []
	) {
		console.log(
			'CatalogService.booksBySelectedGenres called with userId:',
			userId
		);
		const cachedBooksBySelectedGenres = await this.cacheManager.get<
			FeaturedOutput['booksBySelectedGenres']
		>(cacheKeys.booksBySelectedGenres(userId));
		if (cachedBooksBySelectedGenres) {
			console.log(
				'Books by selected genres from cache:',
				cachedBooksBySelectedGenres
			);
			return cachedBooksBySelectedGenres;
		}

		const userSelectedGenres =
			await this.recommendationService.userSelectedGenresById(userId);
		console.log('User selected genres:', userSelectedGenres);

		const booksBySelectedGenres = [];
		const alreadyUsedBookIdSet = new Set(alreadyUsedBookId);
		for (const genre of userSelectedGenres) {
			const books = await this.prisma.book.findMany({
				take: 10,
				select: {
					id: true,
					title: true,
					picture: true,
					rating: true,
					author: {
						select: {
							id: true,
							name: true
						}
					}
				},
				where: {
					isPublic: true,
					genres: {
						some: {
							id: genre.id
						}
					},
					id: {
						notIn: [...alreadyUsedBookIdSet]
					}
				}
			});
			console.log(`Books for genre ${genre.name}:`, books);
			booksBySelectedGenres.push({
				name: genre.name,
				books
			});
			for (const book of books) alreadyUsedBookIdSet.add(book.id);
		}

		await this.cacheManager.set(
			cacheKeys.booksBySelectedGenres(userId),
			booksBySelectedGenres,
			this.timeToLive
		);
		return booksBySelectedGenres;
	}
	private async bestSellersBooks(skippedBookById: string[] = []) {
		console.log(
			'CatalogService.bestSellersBooks called with skippedBookById:',
			skippedBookById
		);
		const cachedBooks = await this.cacheManager.get<ShortBook[]>(
			cacheKeys.bestSellersBooks
		);
		if (cachedBooks) {
			console.log('Best sellers books from cache:', cachedBooks);
			return cachedBooks;
		}

		const books = await this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true,
				id: {
					notIn: skippedBookById
				}
			},
			orderBy: {
				rating: 'desc'
			},
			select: {
				id: true,
				title: true,
				picture: true,
				rating: true,
				author: {
					select: {
						id: true,
						name: true
					}
				}
			}
		});
		console.log('Best sellers books from database:', books);
		await this.cacheManager.set(
			cacheKeys.bestSellersBooks,
			books,
			this.timeToLive
		);
		return books;
	}
}
