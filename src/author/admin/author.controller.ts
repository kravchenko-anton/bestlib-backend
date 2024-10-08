import { Auth } from '@/src/auth/decorators/auth.decorator';
import {
	AuthorCatalogOutput,
	CreateAuthorDto,
	ShortAuthorDto
} from '@/src/author/author.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { AuthorService } from './author.service';

@ApiTags('👨‍🏫 admin-author')
@ApiBearerAuth()
@Controller('admin/author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@Auth('admin')
	@Post('create')
	@ApiBody({
		type: CreateAuthorDto
	})
	async create(@Body() dto: Required<CreateAuthorDto>) {
		return this.authorService.create(dto);
	}

	@Auth('admin')
	@Post('update')
	@ApiBody({
		type: ShortAuthorDto
	})
	async update(@Body() dto: ShortAuthorDto) {
		return this.authorService.update(dto);
	}
	@Auth('admin')
	@Delete('remove/:id')
	async remove(@Param('id') id: string) {
		return this.authorService.delete(id);
	}

	@Auth('admin')
	@Get('/catalog')
	@ApiOkResponse({ type: AuthorCatalogOutput })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AuthorCatalogOutput> {
		return this.authorService.catalog(searchTerm, page || 1);
	}
}
