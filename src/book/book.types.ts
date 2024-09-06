import { PickType } from '@nestjs/swagger';
import { UpdateBookDto } from './dto/book.dto';

export class UpdateBookDtoExtended extends PickType(UpdateBookDto, [
	'title',
	'description',
	'isPublic',
	'picture',
	'rating'
]) {
	ebook?: string;
	pagesCount?: number;
	slug?: string;
	author?: {
		connect: {
			id: string;
		};
	};
	readingTime?: number;
	chapters?: number;
	genres?: { set: { id: string }[] };
	mainGenre?: { connect: { id: string } };
}
