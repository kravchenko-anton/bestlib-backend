import { msToTime } from '@/src/book/helpers/calculateReadingTime';
import { type ReadingHistory, UserLibraryOutput } from '@/src/user/user.dto';
import {
	userCatalogFields,
	userFinishReadingBookFields,
	userLibraryFields,
	userRemoveFromLibraryFields,
	userStartReadingBookFields,
	userToggleSaveFields
} from '@/src/user/user.fields';
import { cacheKeys } from '@/src/utils/common/cacheManagerKeys';
import { statisticReduce } from '@/src/utils/services/statisticReduce.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import * as cacheManagerType from 'cache-manager';
import dayjs from 'dayjs';
import { idSelect } from '../utils/common/return.default.object';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import { returnUserObject } from './return.user.object';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}

	async getUserById(id: string, selectObject: Prisma.UserSelect = {}) {
		console.log('getUserById called with:', id, selectObject);
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: { ...returnUserObject, ...selectObject }
		});
		if (!user) {
			console.error('getUserById error: Something went wrong');
			throw serverError(HttpStatus.BAD_REQUEST, 'Something went wrong');
		}
		console.log('getUserById result:', user);
		return user;
	}

	async userStatistics(userId: string) {
		console.log('userStatistics called with:', userId);
		const lastMonthDate = dayjs().subtract(1, 'month').startOf('day').toDate();

		const rawResult = (await this.prisma.$queryRaw`
            SELECT
                DATE("startDate") AS "date",
                SUM("readingTimeMs") AS "totalReadingTimeMs"
            FROM
                "ReadingHistory"
            WHERE
                "userId" = ${userId}
                AND "startDate" >= ${lastMonthDate}
            GROUP BY
                DATE("startDate")
            ORDER BY
                DATE("startDate") ASC;
        `) as {
			date: Date;
			totalReadingTimeMs: number;
		}[];

		const result = rawResult.map(row => ({
			date: row.date,
			totalReadingTime: msToTime(Number(row.totalReadingTimeMs))
		}));
		console.log('userStatistics result:', result);
		return result;
	}

	async syncHistory(userId: string, dto: ReadingHistory[]) {
		console.log('syncHistory called with:', userId, dto);
		if (dto.length === 0) return [];

		const user = await this.getUserById(userId, {
			readingBooks: { select: { id: true } }
		});
		const userReadingBooks = user.readingBooks.map(book => book.id);

		await this.prisma.readingHistory.createMany({
			data: dto.map(({ id, ...history }) => ({ ...history, userId }))
		});

		const result = await this.prisma.readingHistory.findMany({
			where: { userId, bookId: { in: userReadingBooks } },
			orderBy: { endDate: 'desc' },
			distinct: ['bookId']
		});
		console.log('syncHistory result:', result);
		return result;
	}

	async catalog(searchTerm: string, page: number) {
		console.log('catalog called with:', searchTerm, page);
		const perPage = 20;
		const data = await this.prisma.user.findMany(
			userCatalogFields({ page, perPage, searchTerm })
		);
		const userCount = await this.prisma.user.count();

		const result = {
			data: data.map(user => ({
				...user,
				statistics: statisticReduce({
					statistics: user.readingHistory.map(history => ({ ...history })),
					initialDate: user.createdAt
				})
			})),
			canLoadMore: page < Math.floor(userCount / perPage),
			totalPages: Math.ceil(userCount / perPage)
		};
		console.log('catalog result:', result);
		return result;
	}

	async remove(userId: string) {
		console.log('remove called with:', userId);
		const user = await this.getUserById(userId);
		await this.prisma.user.delete({ where: { id: user.id } });
		console.log('remove completed for userId:', userId);
	}

	async library(userId: string) {
		console.log('library called with:', userId);
		const cachedLibrary = await this.cacheManager.get<UserLibraryOutput>(
			cacheKeys.library(userId)
		);
		if (cachedLibrary) {
			console.log('Returning cached library:', userId);
			return cachedLibrary;
		}

		const library = await this.prisma.user.findUnique(
			userLibraryFields(userId)
		);
		if (!library) {
			console.error('library error: Something went wrong');
			throw serverError(HttpStatus.BAD_REQUEST, 'Something went wrong');
		}

		const { readingBooks, finishedBooks, savedBooks } = library;

		const result = {
			readingBooks: readingBooks,
			finishedBooks,
			savedBooks
		};
		console.log('library result:', result);

		await this.cacheManager.set(cacheKeys.library(userId), result, 60 * 60);
		return result;
	}

	async startReading(userId: string, bookId: string) {
		console.log('startReading called with:', userId, bookId);
		const user = await this.getUserById(userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect
		});
		const isAlreadyReading = user.readingBooks.some(book => book.id === bookId);

		if (!isAlreadyReading) {
			await this.prisma.user.update({
				where: { id: user.id },
				data: userStartReadingBookFields(bookId)
			});
		}

		await this.cacheManager.del(cacheKeys.library(userId));
		console.log(
			'startReading completed for userId:',
			userId,
			'bookId:',
			bookId
		);
	}

	async removeFromLibrary(userId: string, bookId: string) {
		console.log('removeFromLibrary called with:', userId, bookId);
		const user = await this.getUserById(userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect,
			savedBooks: idSelect
		});

		await this.prisma.user.update({
			where: { id: user.id },
			data: userRemoveFromLibraryFields(bookId)
		});
		await this.cacheManager.del(cacheKeys.library(userId));
		console.log(
			'removeFromLibrary completed for userId:',
			userId,
			'bookId:',
			bookId
		);
	}

	async finishReading(userId: string, bookId: string) {
		console.log('finishReading called with:', userId, bookId);
		const user = await this.getUserById(userId, { readingBooks: idSelect });
		const isReadingExist = user.readingBooks.some(book => book.id === bookId);

		if (isReadingExist) {
			await this.prisma.user.update({
				where: { id: user.id },
				data: userFinishReadingBookFields(bookId)
			});
		}
		await this.cacheManager.del(cacheKeys.library(userId));
		console.log(
			'finishReading completed for userId:',
			userId,
			'bookId:',
			bookId
		);
	}

	async toggleSave(userId: string, bookId: string) {
		console.log('toggleSave called with:', userId, bookId);
		const user = await this.getUserById(userId, { savedBooks: idSelect });
		const isSavedExist = user.savedBooks.some(book => book.id === bookId);

		await this.prisma.user.update({
			where: { id: user.id },
			data: userToggleSaveFields({ id: bookId, isSavedExist })
		});

		const result = !isSavedExist;
		console.log(
			'toggleSave result for userId:',
			userId,
			'bookId:',
			bookId,
			'result:',
			result
		);

		await this.cacheManager.del(cacheKeys.library(userId));
		await this.cacheManager.del(cacheKeys.isSaved(userId, bookId));
		return result;
	}
	public async isSaved(userId: string, bookId: string) {
		console.log('isSaved called with:', userId, bookId);

		const cachedResult = await this.cacheManager.get<boolean>(
			cacheKeys.isSaved(userId, bookId)
		);
		if (cachedResult !== undefined) {
			console.log('Returning cached result for isSaved:', cachedResult);
			return cachedResult;
		}

		const user = await this.getUserById(userId, { savedBooks: idSelect });
		const result = user.savedBooks.some(book => book.id === bookId);

		await this.cacheManager.set(
			cacheKeys.isSaved(userId, bookId),
			result,
			60 * 60 * 24
		);

		console.log(
			'isSaved result for userId:',
			userId,
			'bookId:',
			bookId,
			'result:',
			result
		);
		return result;
	}
}
