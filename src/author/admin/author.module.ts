import { AuthorController } from '@/src/author/admin/author.controller';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';

@Module({
	controllers: [AuthorController],
	providers: [AuthorService, PrismaService]
})
export class AuthorModule {}
