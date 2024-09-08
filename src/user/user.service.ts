import type { ReadingHistory } from '@/src/user/dto/user.dto';
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
import { slugSelect } from '../utils/common/return.default.object';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import { returnUserObject } from './return.user.object';
import dayjs from 'dayjs';
import 'dayjs/plugin/utc';

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

	async syncHistory(dto: ReadingHistory[], userId: string) {
		if (dto.length === 0) return;
		await this.prisma.readingHistory.createMany({
			skipDuplicates: true,
			data: dto.map(history => ({
				readingTimeMs: history.readingTimeMs,
				endDate: dayjs(history.endDate).utc().toDate(),
				progressDelta: history.progressDelta,
				startProgress: history.startProgress,
				endProgress: history.endProgress,
				scrollPosition: history.scrollPosition,
				startDate: dayjs(history.startDate).utc().toDate(),
				userId: userId,

				bookId: history.bookId
			}))
		});
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
		//TODO: сделать тут нормалный sql запрос на получение истории
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				goalMinutes: true
			}
		});
		if (!user) throw serverError(HttpStatus.BAD_REQUEST, "User doesn't exist");
		const userHistory = await this.prisma.readingHistory.findMany({
			where: { userId },
			select: {
				id: true,
				endDate: true,
				progressDelta: true,
				readingTimeMs: true,
				startDate: true
			}
		});
		//TODO: сделать по нормальному
		return {
			userSteak: 1,
			pepTalk: 'ads',
			progressByCurrentWeek: [] as any[],
			goalMinutes: user.goalMinutes
		};
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

	async startReading(userId: string, slug: string) {
		await this.checkBookExist(slug);
		const user = await this.getUserById(userId, {
			readingBooks: slugSelect,
			finishedBooks: slugSelect
		});

		const isReadingExist = user.readingBooks.some(book => book.slug === slug);
		if (isReadingExist) return;

		await this.prisma.user.update({
			where: { id: user.id },
			data: userStartReadingBookFields(slug)
		});
	}
	async removeFromLibrary(userId: string, slug: string) {
		await this.checkBookExist(slug);
		const user = await this.getUserById(userId, {
			readingBooks: slugSelect,
			finishedBooks: slugSelect,
			savedBooks: slugSelect
		});

		await this.prisma.user.update({
			where: { id: user.id },
			data: userRemoveFromLibraryFields(slug)
		});
	}

	async finishReading(userId: string, slug: string) {
		await this.checkBookExist(slug);
		const user = await this.getUserById(userId, {
			readingBooks: slugSelect
		});
		const isReadingExist = user.readingBooks.some(book => book.slug === slug);
		if (!isReadingExist) return;

		await this.prisma.user.update({
			where: { id: user.id },
			data: userFinishReadingBookFields(slug)
		});
	}

	async toggleSave(userId: string, slug: string) {
		await this.checkBookExist(slug);
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: slugSelect
			}
		});
		if (!user) throw serverError(HttpStatus.BAD_REQUEST, "User doesn't exist");
		const isSavedExist = user.savedBooks.some(book => book.slug === slug);

		await this.prisma.user.update({
			where: { id: user.id },
			data: userToggleSaveFields({
				slug,
				isSavedExist
			})
		});

		return !isSavedExist;
	}

	public async isSaved(userId: string, slug: string) {
		await this.checkBookExist(slug);
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: slugSelect
			}
		});
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		return user.savedBooks.some(book => book.slug === slug);
	}

	private async checkBookExist(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug, isPublic: true },
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
