import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/services/prisma.service'

import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'

@Module({
	controllers: [GenreController],
	providers: [GenreService, PrismaService],
	exports: [GenreService]
})
export class GenreModule {}
