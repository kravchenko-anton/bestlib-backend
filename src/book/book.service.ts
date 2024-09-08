import { HttpStatus, Injectable } from '@nestjs/common';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import type { Book, CreateBookDto, UpdateBookDto } from './dto/book.dto';
import type { UpdateBookDtoExtended } from './book.types';

import {
	bookCatalogFields,
	infoBySlug,
	infoBySlugAdminFields
} from '@/src/book/book.fields';
import { returnBookObject } from '@/src/book/return.book.object';
import { statisticReduce } from '@/src/utils/services/statisticReduce.service';
import { checkHtmlValid } from '@/src/utils/common/html-validation';
import { slugify } from '@/src/utils/helpers/slugify';

@Injectable()
export class BookService {
	constructor(private readonly prisma: PrismaService) {}

	async infoBySlug(slug: string) {
		console.log('try to get book by slug', slug);
		const book = await this.prisma.book.findUnique({
			where: { slug, isPublic: true },
			select: infoBySlug
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

	async infoBySlugAdmin(id: string) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: infoBySlugAdminFields(id)
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
			data: await this.prisma.book.findMany(
				bookCatalogFields({ page, perPage, searchTerm })
			),
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
				slug: dto.slug || slugify(dto.title),
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

	async remove(slug: string) {
		//TODO: сделать так, чтобы при удалении книги удалялись все статистики по ней
		console.log('try to delete book', slug);
		await this.prisma.book.delete({ where: { slug } });
	}

	//TODO: переделать обновление  с такого на более лучшее
	async update(slug: string, dto: UpdateBookDto) {
		console.log('try to update book', slug, dto);
		const book = await this.prisma.book.findUnique({
			where: { slug },
			select: {
				id: true,
				title: true
			}
		});
		if (!book) throw serverError(HttpStatus.BAD_REQUEST, "Book doesn't exist");
		console.log('book was found', book);
		const { genres, title, authorId, ...rest } = dto;
		let updateData: UpdateBookDtoExtended = {
			...rest
		};

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
		if (title) {
			updateData = {
				...updateData,
				slug: slugify(title)
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
			where: { id: book.id },
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
