import type { INestApplication } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { JwtGuard, MockJwtGuard } from '../utils/guards/jwt.guard'
import prismaService, { PrismaService } from '../utils/services/prisma.service'
import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'

describe('GenreController', () => {
	let app: INestApplication
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GenreController],
			providers: [GenreService, PrismaService]
		})
			.overrideGuard(JwtGuard)
			.useClass(MockJwtGuard)
			.overrideProvider(PrismaService)
			.useValue(prismaService)
			.compile()
		app = module.createNestApplication()
		await app.init()
	})

	it('should return array of genres', async () => {
		const response = await request(app.getHttpServer())
			.get('/genre/')
			.expect(200)

		expect(response.body)
		expect(response.body.length).toBeGreaterThan(0)
	})

	it('should return genre by slug', async () => {
		const response = await request(app.getHttpServer())
			.get('/genre/by-slug/romance')
			.expect(200)

		expect(response.body).toEqual(
			expect.objectContaining({
				slug: expect.any(String),
				name: expect.any(String),
				icon: expect.any(String),
				emoji: expect.any(String)
			})
		)
	})

	//TODO: понять как это, 2 смежных теста +1. После чего дописать тестирование модуля

	afterEach(async () => {
		await app.close()
	})
})
