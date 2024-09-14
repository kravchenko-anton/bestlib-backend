import { PickType } from '@nestjs/swagger';
import { UpdateBookDto } from './book.dto';

export class UpdateBookDtoExtended extends PickType(UpdateBookDto, [
	'title',
	'description',
	'isPublic',
	'picture',
	'rating'
]) {
	slug?: string;
	author?: {
		connect: {
			id: string;
		};
	};
	genres?: { set: { id: string }[] };
	mainGenre?: { connect: { id: string } };
}
