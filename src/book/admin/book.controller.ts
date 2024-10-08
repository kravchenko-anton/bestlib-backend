import { Auth } from '@/src/auth/decorators/auth.decorator';
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
	UpdateBookDto
} from 'src/book/book.dto';
import { BookService } from './book.service';

@ApiTags('📖 admin-book')
@ApiBearerAuth()
@Controller('admin/book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

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
