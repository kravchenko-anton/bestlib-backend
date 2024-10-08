import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InfoById } from 'src/book/book.dto';
import { BookService } from './book.service';

@ApiTags('📙 book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get('/info/by-id/:id')
	@ApiOkResponse({ type: InfoById })
	async infoById(@Param('id') id: string): Promise<InfoById> {
		return this.bookService.infoById(id);
	}
}
