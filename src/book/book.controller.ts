import { CurrentUser } from '@/src/auth/decorators/user.decorator';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import {
	BookCatalogOutput,
	CreateBookDto,
	CreateImpressionDto,
	FullBook,
	InfoById,
	UpdateBookDto
} from 'src/book/book.dto';
import { Auth } from '../auth/decorators/auth.decorator';
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

	@Auth('admin')
	@Get('/admin-info/by-id/:id')
	@ApiOkResponse({ type: FullBook })
	async adminInfoById(@Param('id') id: string): Promise<FullBook> {
		return this.bookService.infoByIdAdmin(id);
	}

	@Auth('admin')
	@Get('/admin/catalog')
	@ApiOkResponse({ type: BookCatalogOutput })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<BookCatalogOutput> {
		return this.bookService.catalog(searchTerm, page || 1);
	}

	@Auth('admin')
	@Post('admin/create')
	@ApiOkResponse({ type: undefined })
	@ApiBody({
		type: CreateBookDto,
		description: 'Create book'
	})
	async create(@Body() dto: CreateBookDto) {
		return this.bookService.create(dto);
	}

	@Auth('admin')
	@ApiOkResponse({ type: undefined })
	@Put('admin/update/:id')
	async update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
		return this.bookService.update(id, dto);
	}
	@Auth('admin')
	@ApiOkResponse({ type: undefined })
	@Post('admin/remove/:id')
	async review(
		@CurrentUser('id') userId: string,
		@Body() dto: CreateImpressionDto
	) {
		return this.bookService.review(userId, dto);
	}

	@Auth('admin')
	@ApiOkResponse({ type: undefined })
	@Delete('admin/remove/:id')
	async remove(@Param('id') id: string) {
		return this.bookService.remove(id);
	}
}
