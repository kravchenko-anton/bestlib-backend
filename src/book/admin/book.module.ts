import { GenreService } from '@/src/genre/genre.service';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
	controllers: [BookController],
	providers: [BookService, PrismaService, GenreService]
})
export class BookModule {}
