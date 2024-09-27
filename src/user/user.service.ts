import { msToTime } from '@/src/book/helpers/calculateReadingTime';
import type { ReadingHistory } from '@/src/user/user.dto';
import {
	userCatalogFields,
	userFinishReadingBookFields,
	userLibraryFields,
	userRemoveFromLibraryFields,
	userStartReadingBookFields,
	userToggleSaveFields
} from '@/src/user/user.fields';
import { statisticReduce } from '@/src/utils/services/statisticReduce.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { idSelect } from '../utils/common/return.default.object';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import { returnUserObject } from './return.user.object';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserById(id: string, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				...selectObject
			}
		});
		if (!user) {
			throw serverError(HttpStatus.BAD_REQUEST, 'Something went wrong');
		}
		return user;
	}

	async adjustGoal(userId: string, goal: number) {
		if (goal % 10 !== 0 || goal < 10 || goal > 180)
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid goal');
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				goalMinutes: goal
			}
		});
	}
	async userStatistics(userId: string) {
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

		return rawResult.map(row => ({
			date: row.date,
			totalReadingTime: msToTime(Number(row.totalReadingTimeMs))
		}));
	}

	async syncHistory(userId: string, dto: ReadingHistory[]) {
		if (dto.length === 0) return [];
		const user = await this.getUserById(userId, {
			readingBooks: {
				select: {
					id: true
				}
			}
		});
		await this.prisma.readingHistory.createMany({
			data: dto.map(({ id, ...history }) => ({
				...history,
				userId
			}))
		});
		const userReadingBooks = user.readingBooks.map(book => book.id);
		return this.prisma.readingHistory.findMany({
			where: {
				userId,
				bookId: {
					in: userReadingBooks
				}
			},
			orderBy: {
				endDate: 'desc'
			},
			distinct: ['bookId']
		});
	}

	async library(userId: string) {
		const library = await this.prisma.user.findUnique(
			userLibraryFields(userId)
		);
		if (!library)
			throw serverError(HttpStatus.BAD_REQUEST, "User doesn't exist");
		const { readingBooks, finishedBooks, savedBooks } = library;
		return {
			readingBooks: readingBooks
				.map(book => {
					const latestHistory = book.readingHistory[0] ?? null;
					return {
						...book,
						readingHistory: {
							scrollPosition: latestHistory?.scrollPosition ?? 0,
							endDate: latestHistory?.endDate,
							progress: latestHistory?.endProgress ?? 0
						}
					};
				})
				.sort(
					(a, b) =>
						(b.readingHistory?.endDate?.getTime() ?? 0) -
						(a.readingHistory?.endDate?.getTime() ?? 0)
				),
			finishedBooks,
			savedBooks
		};
	}

	async catalog(searchTerm: string, page: number) {
		const perPage = 20;
		const data = await this.prisma.user.findMany(
			userCatalogFields({ page, perPage, searchTerm })
		);
		const userCount = await this.prisma.user.count();
		return {
			data: data.map(({ readingHistory, ...user }) => ({
				...user,
				statistics: statisticReduce({
					statistics: readingHistory.map(({ ...history }) => ({
						...history
					})),
					initialDate: user.createdAt
				})
			})),
			canLoadMore: page < Math.floor(userCount / perPage),
			totalPages: Math.floor(userCount / perPage)
		};
	}

	async remove(id: string) {
		const user = await this.getUserById(id);
		await this.prisma.user.delete({
			where: { id: user.id }
		});
	}

	async startReading(userId: string, id: string) {
		await this.checkBookExist(id);
		const user = await this.getUserById(userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect
		});

		const isReadingExist = user.readingBooks.some(book => book.id === id);
		if (isReadingExist) return;

		await this.prisma.user.update({
			where: { id: user.id },
			data: userStartReadingBookFields(id)
		});
	}
	async removeFromLibrary(userId: string, id: string) {
		await this.checkBookExist(id);
		const user = await this.getUserById(userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect,
			savedBooks: idSelect
		});

		await this.prisma.user.update({
			where: { id: user.id },
			data: userRemoveFromLibraryFields(id)
		});
	}

	async finishReading(userId: string, id: string) {
		await this.checkBookExist(id);
		const user = await this.getUserById(userId, {
			readingBooks: idSelect
		});
		const isReadingExist = user.readingBooks.some(book => book.id === id);
		if (!isReadingExist) return;

		await this.prisma.user.update({
			where: { id: user.id },
			data: userFinishReadingBookFields(id)
		});
	}

	async toggleSave(userId: string, id: string) {
		await this.checkBookExist(id);
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: idSelect
			}
		});
		if (!user) throw serverError(HttpStatus.BAD_REQUEST, "User doesn't exist");
		const isSavedExist = user.savedBooks.some(book => book.id === id);

		await this.prisma.user.update({
			where: { id: user.id },
			data: userToggleSaveFields({
				id,
				isSavedExist
			})
		});

		return !isSavedExist;
	}

	public async isSaved(userId: string, id: string) {
		await this.checkBookExist(id);
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: idSelect
			}
		});
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		return user.savedBooks.some(book => book.id === id);
	}

	private async checkBookExist(id: string) {
		const book = await this.prisma.book.findUnique({
			where: { id, isPublic: true },
			select: {
				id: true,
				title: true
			}
		});
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, 'Something went wrong');
		return !!book;
	}
}
