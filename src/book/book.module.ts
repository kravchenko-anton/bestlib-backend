import { Module } from '@nestjs/common';
import { PrismaService } from '../utils/services/prisma.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
	controllers: [BookController],
	providers: [BookService, PrismaService],
	exports: [BookService]
})
export class BookModule {}
