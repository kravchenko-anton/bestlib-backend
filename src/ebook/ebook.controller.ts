import {
	Controller,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EbookOutput, UnfoldOutput } from './dto/ebook.dto';
import { EbookService } from './ebook.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@/src/auth/decorators/auth.decorator';

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

	@Post('admin/unfold')
	@ApiOkResponse({
		type: UnfoldOutput,
		description: 'Unfolded book content'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@UseInterceptors(FileInterceptor('file'))
	async unfold(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 10_000_000_000
					})
				]
			})
		)
		file: Express.Multer.File
	): Promise<UnfoldOutput> {
		return this.ebookService.unfold(file);
	}
}
