import {
	type CreateBookDto,
	CreateImpressionDto,
	type UpdateBookDto
} from '@/src/book/book.dto';
import type { UpdateBookDtoExtended } from '@/src/book/book.types';
import { GenreService } from '@/src/genre/genre.service';
import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { checkHtmlValid } from '@/src/utils/common/html-validation';
import { serverError } from '@/src/utils/helpers/server-error';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { statisticReduce } from '@/src/utils/services/statisticReduce.service';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly genreService: GenreService
	) {}

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
		const { genreIds, mainGenreId } = await this.genreService.getGenresWithMain(
			dto.genres
		);

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
			const { genreIds, mainGenreId } =
				await this.genreService.getGenresWithMain(genres);
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
}
