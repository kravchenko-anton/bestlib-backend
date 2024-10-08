import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorDto } from 'src/author/author.dto';
import { AuthorService } from './author.service';

@ApiTags('👨‍🏫 author')
@ApiBearerAuth()
@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@Get('by-id/:id')
	@ApiOkResponse({ type: AuthorDto })
	async byId(@Param('id') id: string): Promise<AuthorDto> {
		return this.authorService.byId(id);
	}
}
