import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { FindOneGenreOutput, ShortGenre } from './genre.dto';

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
	@Get('/by-id/:id')
	@ApiOkResponse({ type: FindOneGenreOutput })
	async byId(@Param('id') genreId: string): Promise<FindOneGenreOutput> {
		if (!genreId) throw new Error('Genre ID is required');
		return this.genreService.byId(genreId);
	}
}
