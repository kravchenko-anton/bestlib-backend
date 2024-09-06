import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { FindOneGenreOutput, ShortGenre } from './dto/genre.dto';

import { GenreService } from './genre.service';

@ApiTags('🔖 genre')
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	@ApiOkResponse({ type: [ShortGenre] })
	async catalog(): Promise<ShortGenre[]> {
		return this.genreService.catalog();
	}

	@Auth()
	@Get('/by-id/:slug')
	@ApiOkResponse({ type: FindOneGenreOutput })
	async byId(@Param('id') genreId: string): Promise<FindOneGenreOutput> {
		return this.genreService.byId(genreId);
	}
}
