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
		console.log(' start searching for:', query);
		return this.prisma.book.findMany({
			where: catalogSearchFields(query),
			select: returnBookObject
		});
	}

	async featured(userId: string) {
		console.log('start featured for:', userId);
		const alreadyUsedBookId: string[] = [];
		const pushBooks = (books: ShortBook[]) => {
			alreadyUsedBookId.push(...books.map(book => book.id));
			return books;
		};
		const userSelectedGenres =
			await this.recommendationService.userSelectedGenresById(userId);
		console.log('get userSelectedGenres:', userSelectedGenres);
		const booksBySelectedGenres = userSelectedGenres.map(genre =>
			this.prisma.book.findMany({
				take: 10,
				include: {
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
			})
		);
		console.log('get booksBySelectedGenres:', booksBySelectedGenres);
		const response = {
			picksOfWeek: await this.picksOfTheWeek(alreadyUsedBookId).then(pushBooks),
			genres: await this.prisma.genre.findMany({}),
			bestSellingBooks:
				await this.bestSellersBooks(alreadyUsedBookId).then(pushBooks),
			newReleases: await this.newReleases(alreadyUsedBookId).then(pushBooks),
			booksBySelectedGenres: await Promise.all(booksBySelectedGenres)
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
			include: {
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
			include: {
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

	private newReleases(skippedBookById: string[] = []) {
		console.log('start newReleases');
		const books = this.prisma.book.findMany({
			take: 10,
			include: {
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
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
		console.log('get newReleases:', books);
		return books;
	}
}
