import { HttpStatus, Injectable } from '@nestjs/common';
import { returnBookObject } from '../book/return.book.object';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import { ReturnGenreObject } from './return.genre.object';

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	catalog() {
		return this.prisma.genre.findMany({
			select: ReturnGenreObject
		});
	}

	async byId(genreId: string) {
		const genre = await this.prisma.genre.findUnique({
			where: {
				id: genreId
			},
			select: {
				...ReturnGenreObject,
				books: {
					select: returnBookObject,
					where: {
						isPublic: true
					}
				}
			}
		});
		if (!genre)
			throw serverError(HttpStatus.BAD_REQUEST, "Something's wrong, try again");
		return genre;
	}
}
