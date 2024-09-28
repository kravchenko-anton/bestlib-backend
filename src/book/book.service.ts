import {
	calculateReadingTime,
	minutesToTime
} from '@/src/book/helpers/calculateReadingTime';
import { returnBookObject } from '@/src/book/return.book.object';
import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { cacheKeys } from '@/src/utils/common/cacheManagerKeys';
import { checkHtmlValid } from '@/src/utils/common/html-validation';
import { statisticReduce } from '@/src/utils/services/statisticReduce.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import {
	type Book,
	type CreateBookDto,
	CreateImpressionDto,
	InfoById,
	type UpdateBookDto
} from './book.dto';
import type { UpdateBookDtoExtended } from './book.types';

@Injectable()
export class BookService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}

	async infoById(id: string) {
		console.log('BookService.infoById called with id:', id);

		const cachedData = await this.cacheManager.get<InfoById>(
			cacheKeys.bookInfo(id)
		);
		if (cachedData) {
			console.log('Returning cached data for book id:', id);
			return cachedData;
		}

		const wordCount = await this.prisma.chapter.aggregate({
			where: {
				bookId: id
			},
			_sum: {
				wordCount: true
			}
		});
		const book = await this.prisma.book.findUnique({
			where: { id, isPublic: true },
			select: {
				title: true,
				isPublic: true,
				summary: true,
				concept: true,
				id: true,
				picture: true,
				author: {
					select: {
						id: true,
						name: true,
						picture: true
					}
				},
				description: true,
				mainGenre: false,
				rating: true,
				genres: { select: ReturnGenreObject }
			}
		});

		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");

		const response = {
			...book,
			readingTime: minutesToTime(
				calculateReadingTime(Number(wordCount._sum?.wordCount)) || 0
			),
			fromSameAuthor: await this.prisma.book.findMany({
				where: {
					isPublic: true,
					authorId: book.author.id,
					id: {
						not: book.id
					}
				},
				select: returnBookObject
			})
		};
		console.log('BookService.infoById response:', response);

		await this.cacheManager.set(cacheKeys.bookInfo(id), response, 60 * 60);

		return response;
	}

	async infoByIdAdmin(id: string) {
		console.log('BookService.infoByIdAdmin called with id:', id);
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				picture: true,
				isRecommendable: true,
				authorId: true,
				author: true,
				createdAt: true,
				updatedAt: true,
				rating: true,
				genres: {
					select: ReturnGenreObject
				},
				concept: true,
				summary: true,
				description: true,
				isPublic: true,
				_count: {
					select: {
						finishedBy: true,
						readingBy: true,
						savedBy: true
					}
				},
				readingHistory: {
					where: {
						bookId: id
					},
					orderBy: {
						endDate: 'asc'
					},
					select: {
						endDate: true,
						progressDelta: true,
						readingTimeMs: true,
						scrollPosition: true,
						startDate: true
					}
				}
			}
		});
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");

		const { readingHistory = [], ...rest } = book;
		const response = {
			...rest,
			statistics: statisticReduce({
				statistics: readingHistory.map(statistics => ({
					...statistics
				})),
				initialDate: book.createdAt,
				nowDate: true
			})
		};
		console.log('BookService.infoByIdAdmin response:', response);
		return response;
	}

	async catalog(searchTerm: string, page: number) {
		console.log(
			'BookService.catalog called with searchTerm:',
			searchTerm,
			'and page:',
			page
		);
		const perPage = 100;
		const count = await this.prisma.book.count();
		const response = {
			data: await this.prisma.book.findMany({
				take: perPage,
				select: {
					author: true,
					summary: true,
					concept: true,
					title: true,
					picture: true,
					id: true,
					genres: { select: ReturnGenreObject },
					rating: true,
					isPublic: true,
					description: true,
					mainGenre: {
						select: ReturnGenreObject
					}
				},
				orderBy: {
					isPublic: 'asc'
				},
				...(page && {
					skip: page * perPage
				}),
				...(searchTerm && {
					where: {
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					...(searchTerm && {
						where: {
							id: searchTerm
						}
					})
				})
			}),
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		};
		console.log('BookService.catalog response:', response);
		return response;
	}

	async create(dto: CreateBookDto) {
		console.log('BookService.create called with dto:', dto);
		const { genreIds, mainGenreId } = await this.getGenres(dto.genres);

		const { isValid, messages } = await checkHtmlValid(
			dto.chapters.map(book => book.content).join('')
		);

		if (!isValid) throw serverError(HttpStatus.BAD_REQUEST, messages);
		const book = await this.prisma.book.create({
			data: {
				summary: dto.summary,
				concept: dto.concept,
				title: dto.title,
				picture: dto.picture,
				rating: dto.rating,
				description: dto.description,
				author: {
					connect: {
						id: dto.authorId
					}
				},
				genres: {
					connect: genreIds
				},
				mainGenre: {
					connect: {
						id: mainGenreId
					}
				}
			}
		});

		await this.prisma.chapter.createMany({
			data: dto.chapters.map(chapter => ({
				bookId: book.id,
				...chapter
			}))
		});
		console.log('BookService.create created book:', book);
	}

	async remove(id: string) {
		console.log('BookService.remove called with id:', id);
		await this.prisma.book.delete({ where: { id } });
		console.log('BookService.remove deleted book with id:', id);
	}

	async review(id: string, dto: CreateImpressionDto) {
		console.log('BookService.review called with id:', id, 'and dto:', dto);
		await this.prisma.impression.create({
			data: {
				userId: id,
				bookId: dto.bookId,
				rating: dto.rating || 0,
				text: dto.text || '',
				tags: dto.tags || []
			}
		});
		console.log(
			'BookService.review created impression for bookId:',
			dto.bookId
		);
	}

	async update(id: string, dto: UpdateBookDto) {
		console.log('BookService.update called with id:', id, 'and dto:', dto);
		const { genres, authorId, ...rest } = dto;
		let updateData: UpdateBookDtoExtended = rest;

		if (genres) {
			const { genreIds, mainGenreId } = await this.getGenres(genres);
			updateData = {
				...updateData,
				genres: {
					set: genreIds
				},
				mainGenre: {
					connect: {
						id: mainGenreId
					}
				}
			};
		}
		if (authorId) {
			const author = await this.prisma.author.findUnique({
				where: { id: authorId }
			});
			if (!author)
				throw serverError(HttpStatus.BAD_REQUEST, "Author doesn't exist");
			updateData = {
				...updateData,
				author: {
					connect: {
						id: authorId
					}
				}
			};
		}

		await this.prisma.book.update({
			where: { id: id },
			data: updateData
		});
		console.log('BookService.update updated book with id:', id);
	}

	async getGenres(genres: Book['genres']) {
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
