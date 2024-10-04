import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import type * as cacheManager from 'cache-manager';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import { UserService } from './user.service';

const mockUser = {
	id: '6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691',
	readingBooks: [],
	finishedBooks: [],
	savedBooks: [],
	createdAt: new Date(),
	readingHistory: []
};

const mockReadingHistory = [
	{
		id: '6d5841d4-2e63-4f3f-9b9b-9b1b21c9e691',
		userId: '6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691',
		bookId: 'book-123',
		scrollPosition: 0,
		startProgress: 0,
		endProgress: 0,
		progressDelta: 0,

		startDate: new Date(),
		endDate: new Date(),
		readingTimeMs: 5000
	}
];

const mockPrismaService = {
	user: {
		findUnique: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		findMany: jest.fn(),
		count: jest.fn()
	},
	readingHistory: {
		createMany: jest.fn(),
		findMany: jest.fn()
	},
	$queryRaw: jest.fn()
};

const mockCacheManager = {
	get: jest.fn(),
	set: jest.fn(),
	del: jest.fn()
};

describe('UserService', () => {
	let userService: UserService;
	let prisma: PrismaService;
	let cache: cacheManager.Cache;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{ provide: PrismaService, useValue: mockPrismaService },
				{ provide: CACHE_MANAGER, useValue: mockCacheManager }
			]
		}).compile();

		userService = module.get<UserService>(UserService);
		prisma = module.get<PrismaService>(PrismaService);
		cache = module.get(CACHE_MANAGER);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUserById', () => {
		it('should return user if found', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

			const result = await userService.getUserById(
				'6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691'
			);
			expect(result).toEqual(mockUser);
			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { id: '6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691' },
				select: expect.any(Object)
			});
		});

		it('should throw error if user is not found', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue(null);

			await expect(
				userService.getUserById('6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691')
			).rejects.toThrow(
				serverError(HttpStatus.BAD_REQUEST, 'Something went wrong')
			);
		});
	});

	describe('userStatistics', () => {
		it('should return user statistics', async () => {
			const mockRawResult = [{ date: new Date(), totalReadingTimeMs: 5000 }];
			mockPrismaService.$queryRaw.mockResolvedValue(mockRawResult);

			const result = await userService.userStatistics(
				'6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691'
			);
			expect(result).toEqual([
				{ date: mockRawResult[0]?.date, totalReadingTime: '0h 0m 5s' }
			]);
		});
	});

	describe('syncHistory', () => {
		it('should sync reading history and return updated history', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue({
				...mockUser,
				readingBooks: [{ id: 'book-123' }]
			});
			mockPrismaService.readingHistory.findMany.mockResolvedValue(
				mockReadingHistory
			);

			const result = await userService.syncHistory(
				'6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691',
				mockReadingHistory
			);
			expect(result).toEqual(mockReadingHistory);
		});
	});

	describe('startReading', () => {
		it('should add a book to reading list if not already reading', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue({
				...mockUser,
				readingBooks: []
			});

			await userService.startReading(
				'6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691',
				'book-123'
			);
			expect(prisma.user.update).toHaveBeenCalledWith({
				where: { id: '6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691' },
				data: expect.any(Object)
			});
			expect(cache.del).toHaveBeenCalledWith(expect.any(String));
		});
	});

	describe('removeFromLibrary', () => {
		it('should remove a book from user library', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue({
				...mockUser,
				readingBooks: [{ id: 'book-123' }],
				finishedBooks: [],
				savedBooks: []
			});

			await userService.removeFromLibrary(
				'6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691',
				'book-123'
			);
			expect(prisma.user.update).toHaveBeenCalledWith({
				where: { id: '6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691' },
				data: expect.any(Object)
			});
			expect(cache.del).toHaveBeenCalledWith(expect.any(String));
		});
	});

	describe('isSaved', () => {
		it('should return true if the book is saved', async () => {
			mockCacheManager.get.mockResolvedValue(null);
			mockPrismaService.user.findUnique.mockResolvedValue({
				...mockUser,
				savedBooks: [{ id: 'book-123' }]
			});

			const result = await userService.isSaved(
				'6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691',
				'book-123'
			);
			expect(result).toBe(true);
			expect(cache.set).toHaveBeenCalledWith(
				expect.any(String),
				true,
				expect.any(Number)
			);
		});

		it('should return false if the book is not saved', async () => {
			mockCacheManager.get.mockResolvedValue(null);
			mockPrismaService.user.findUnique.mockResolvedValue({
				...mockUser,
				savedBooks: []
			});

			const result = await userService.isSaved(
				'6d5841d7-2e63-4f3f-9b9b-9b1b21c9e691',
				'book-456'
			);
			expect(result).toBe(false);
			expect(cache.set).toHaveBeenCalledWith(
				expect.any(String),
				false,
				expect.any(Number)
			);
		});
	});
});
