import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { EbookOutput, StoredEBook } from './dto/ebook.dto';
import { EbookService } from './ebook.service';

@Controller('ebook')
@ApiTags('📙 ebook')
export class EbookController {
	constructor(private readonly ebookService: EbookService) {}

	@Auth()
	@Get('/ebook/by-id/:id')
	@ApiOkResponse({ type: EbookOutput })
	async ebookById(@Param('id') bookId: string): Promise<EbookOutput> {
		return this.ebookService.ebookById(bookId);
	}

	//  admin
	@Auth('admin')
	@Get('/admin/stored-ebook/:id')
	@ApiOkResponse({ type: [StoredEBook] })
	async storedEbookById(@Param('id') bookSlug: string): Promise<StoredEBook[]> {
		return this.ebookService.storedEbookById(bookSlug);
	}
}
