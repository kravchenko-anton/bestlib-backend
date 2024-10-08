import type { InfoById } from '@/src/book/book.dto';
import {
	calculateReadingTime,
	minutesToTime
} from '@/src/book/helpers/calculateReadingTime';
import { returnBookObject } from '@/src/book/return.book.object';
import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { cacheKeys } from '@/src/utils/common/cacheManagerKeys';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as cacheManagerType from 'cache-manager';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';

@Injectable()
export class BookService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}

	async findMany(
		where: Prisma.BookWhereInput,
		{
			withAuthor = true,
			notPublic = false,
			select = {}
		}: {
			withAuthor?: boolean;
			notPublic?: boolean;
			select?: Prisma.UserSelect;
		}
	) {
		console.log('BookService.findMany called');
		return this.prisma.book.findMany({
			where: {
				...where,
				isPublic: !notPublic
			},
			select: {
				...returnBookObject,
				...select,
				...(withAuthor && {
					author: {
						select: {
							id: true,
							name: true,
							picture: true
						}
					}
				})
			}
		});
	}

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
}
