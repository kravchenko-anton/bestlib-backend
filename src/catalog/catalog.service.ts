import { returnBookObject } from '@/src/book/return.book.object';
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
		console.log('start searching for:', query);
		return this.prisma.book.findMany({
			where: catalogSearchFields(query),
			select: returnBookObject
		});
	}

	async featured(userId: string) {
		console.log('start featured for:', userId);
		const alreadyUsedBookId: Set<string> = new Set();

		const pushBooks = (books: ShortBook[]) => {
			for (const book of books) alreadyUsedBookId.add(book.id);
			return books;
		};
		const userSelectedGenres =
			await this.recommendationService.userSelectedGenresById(userId);
		const booksBySelectedGenres = [];
		for (const genre of userSelectedGenres) {
			booksBySelectedGenres.push({
				name: genre.name,
				books: await this.prisma.book
					.findMany({
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
								notIn: [...alreadyUsedBookId]
							}
						}
					})
					.then(pushBooks)
			});
		}
		console.log('get booksBySelectedGenres:', booksBySelectedGenres);
		const response = {
			picksOfWeek: await this.picksOfTheWeek([...alreadyUsedBookId]).then(
				pushBooks
			),
			genres: await this.prisma.genre.findMany({}),
			bestSellingBooks: await this.bestSellersBooks([
				...alreadyUsedBookId
			]).then(pushBooks),
			booksBySelectedGenres
		};

		console.log('get response:', response);
		return response;
	}

	async picksOfTheWeek(skippedBookById: string[] = []) {
		console.log('start picksOfTheWeek');
		const picksOfTheWeek: ShortBook[] | undefined =
			await this.cacheManager.get('picksOfTheWeek');
		console.log('get picksOfTheWeek:', picksOfTheWeek);
		if (picksOfTheWeek) return picksOfTheWeek;

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
		console.log('fetch picks:', picks);
		const timeToSave = 60 * 60 * 24 * 7; // 1 week
		await this.cacheManager.set('picksOfTheWeek', picks, timeToSave);
		console.log('set picksOfTheWeek:', picks);

		return picks;
	}

	private bestSellersBooks(skippedBookById: string[] = []) {
		console.log('start bestSellersBooks');
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
		console.log('get bestSellersBooks:', books);
		return books;
	}
}
