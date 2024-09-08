import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { PrismaService } from '@/src/utils/services/prisma.service';

@Module({
	controllers: [AuthorController],
	providers: [AuthorService, PrismaService],
	exports: [AuthorService]
})
export class AuthorModule {}
