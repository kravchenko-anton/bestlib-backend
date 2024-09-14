import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { Auth } from '@/src/auth/decorators/auth.decorator';
import {
	AuthorCatalogOutput,
	AuthorDto,
	CreateAuthorDto, ShortAuthorDto
} from 'src/author/author.dto'

@ApiTags('👨‍🏫 author')
@ApiBearerAuth()
@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}
	
	@Get('by-id/:id')
	@ApiOkResponse({ type: AuthorDto })
	async byId(@Param("id") id: string): Promise<AuthorDto> {
		return this.authorService.byId(id);
	}
	
	@Auth('admin')
	@Post('admin/create')
	@ApiBody({
		type: CreateAuthorDto
	})
	async create(@Body() dto: Required<CreateAuthorDto>) {
		return this.authorService.create(dto);
	}

	@Auth('admin')
	@Post('admin/update')
	@ApiBody({
		type: ShortAuthorDto
	})
	async update(@Body() dto: ShortAuthorDto) {
		return this.authorService.update(dto);
	}
	@Auth('admin')
	@Delete('admin/remove/:id')
	async remove(@Param('id') id: string) {
		return this.authorService.delete(id);
	}

	@Auth('admin')
	@Get('/admin/catalog')
	@ApiOkResponse({ type: AuthorCatalogOutput })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AuthorCatalogOutput> {
		return this.authorService.catalog(searchTerm, page || 1);
	}
}
