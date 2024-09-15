import { returnBookObject } from '@/src/book/return.book.object';
import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { checkHtmlValid } from '@/src/utils/common/html-validation';
import { statisticReduce } from '@/src/utils/services/statisticReduce.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import {
	type Book,
	type CreateBookDto,
	CreateImpressionDto,
	type UpdateBookDto
} from './book.dto';
import type { UpdateBookDtoExtended } from './book.types';

@Injectable()
export class BookService {
	constructor(private readonly prisma: PrismaService) {}

	async infoById(id: string) {
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
		console.log('book was found', book);
		return {
			...book,
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
	}

	async infoByIdAdmin(id: string) {
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

		return {
			...rest,
			statistics: statisticReduce({
				statistics: readingHistory.map(statistics => ({
					...statistics
				})),
				initialDate: book.createdAt,
				nowDate: true
			})
		};
	}

	async catalog(searchTerm: string, page: number) {
		console.log('try to get book catalog', searchTerm, page);
		const perPage = 20;
		const count = await this.prisma.book.count();
		return {
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
	}

	async create(dto: CreateBookDto) {
		console.log('try to create book', dto);
		const { genreIds, mainGenreId } = await this.getGenres(dto.genres);
		console.log('get genres for book', genreIds, mainGenreId);

		const { isValid, messages } = await checkHtmlValid(
			dto.chapters.map(book => book.content).join('')
		);

		if (!isValid) throw serverError(HttpStatus.BAD_REQUEST, messages);
		console.log('try to create book', dto.title);
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
		console.log('book created success, try create chapters');

		await this.prisma.chapter.createMany({
			data: dto.chapters.map(chapter => ({
				bookId: book.id,
				title: chapter.title,
				content: chapter.content,
				position: chapter.position
			}))
		});
		console.log('chapters created success');
	}

	async remove(id: string) {
		//TODO: сделать так, чтобы при удалении книги удалялись все статистики по ней
		console.log('try to delete book', id);
		await this.prisma.book.delete({ where: { id } });
	}

	async review(id: string, dto: CreateImpressionDto) {
		await this.prisma.impression.create({
			data: {
				userId: id,
				bookId: dto.bookId,
				rating: dto.rating,
				text: dto.text,
				tags: dto.tags
			}
		});
	}
	//TODO: переделать обновление  с такого на более лучшее
	async update(id: string, dto: UpdateBookDto) {
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
	}

	async getGenres(genres: Book['genres']) {
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
		return {
			mainGenreId: mainGenre.id,
			genreIds: genres.map(({ id }) => ({ id }))
		};
	}
}
