import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ShortBook } from '../book/dto/book.dto';
import { FeaturedOutput } from './dto/catalog.dto';

import { CatalogService } from './catalog.service';

@ApiTags('📚 catalog')
@ApiBearerAuth()
@Controller('catalog')
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}
	@Auth()
	@Get('/search/:query')
	@ApiOkResponse({ type: [ShortBook] })
	async search(@Param('query') query: string): Promise<ShortBook[]> {
		return this.catalogService.search(query);
	}
	@Auth()
	@Get('/featured')
	@ApiOkResponse({ type: FeaturedOutput })
	async featured(@CurrentUser('id') userId: string): Promise<FeaturedOutput> {
		return this.catalogService.featured(userId);
	}

	@Get('/picks-of-the-week')
	@ApiOkResponse({ type: [ShortBook] })
	async picksOfTheWeek(): Promise<ShortBook[]> {
		return this.catalogService.picksOfTheWeek();
	}
}
