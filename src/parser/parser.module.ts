import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/services/prisma.service'
import { ParserController } from './parser.controller'
import { ParserService } from './parser.service'

@Module({
	controllers: [ParserController],
	providers: [ParserService, PrismaService]
})
export class ParserModule {}
