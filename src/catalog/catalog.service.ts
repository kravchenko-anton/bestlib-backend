import { returnBookObject } from '@/src/book/return.book.object';
import type { FeaturedOutput } from '@/src/catalog/catalog.dto';
import { catalogSearchFields } from '@/src/catalog/catalog.fields';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import type { ShortBook } from 'src/book/book.dto';
import { RecommendationService } from '../recommendation/recommendation.service';
import { PrismaService } from '../utils/services/prisma.service';

@Injectable()
export class CatalogService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly recommendationService: RecommendationService,
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
		const cacheKey = `featured_${userId}`;
		const cachedResponse = await this.cacheManager.get(cacheKey);
		if (cachedResponse) {
			console.log('Featured response from cache:', cachedResponse);
			return cachedResponse as FeaturedOutput;
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
			genres: await this.prisma.genre.findMany({}),
			bestSellingBooks: await this.bestSellersBooks([
				...alreadyUsedBookId
			]).then(pushBooks),
			booksBySelectedGenres: await this.booksBySelectedGenres(
				userId,
				[...alreadyUsedBookId],
				pushBooks
			)
		};
		console.log('Featured response:', response);
		await this.cacheManager.set(cacheKey, response, 60 * 60 * 24);
		return response;
	}

	async picksOfTheWeek(skippedBookById: string[] = []) {
		console.log(
			'CatalogService.picksOfTheWeek called with skippedBookById:',
			skippedBookById
		);
		const picksOfTheWeek: ShortBook[] | undefined =
			await this.cacheManager.get('picksOfTheWeek');
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
		await this.cacheManager.set('picksOfTheWeek', picks, 60 * 60 * 24);
		return picks;
	}

	private async booksBySelectedGenres(
		userId: string,
		alreadyUsedBookId: string[] = [],
		pushBooks: (books: ShortBook[]) => ShortBook[] = books => books
	) {
		console.log(
			'CatalogService.booksBySelectedGenres called with userId:',
			userId
		);
		const userSelectedGenres =
			await this.recommendationService.userSelectedGenresById(userId);
		console.log('User selected genres:', userSelectedGenres);

		const booksBySelectedGenres = [];
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
						notIn: alreadyUsedBookId
					}
				}
			});
			console.log(`Books for genre ${genre.name}:`, books);
			booksBySelectedGenres.push({
				name: genre.name,
				books: pushBooks(books)
			});
		}
		return booksBySelectedGenres;
	}

	private bestSellersBooks(skippedBookById: string[] = []) {
		console.log(
			'CatalogService.bestSellersBooks called with skippedBookById:',
			skippedBookById
		);
		const books = this.prisma.book.findMany({
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
		console.log('Best sellers books:', books);
		return books;
	}
}
