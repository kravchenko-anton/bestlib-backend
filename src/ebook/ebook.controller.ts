import {
	Body,
	Controller,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Put,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	Chapter,
	EbookOutput,
	UnfoldOutput,
	UpdateChapterDto
} from './dto/ebook.dto';
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
	@Auth()
	@Get('/admin-ebook/by-id/:id')
	@ApiOkResponse({ type: [Chapter] })
	async adminEbookById(@Param('id') bookId: string): Promise<Chapter[]> {
		return this.ebookService.adminEbookById(bookId);
	}

	@Auth()
	@Put('/update-chapter/by-id/:id')
	@ApiBody({ type: UpdateChapterDto })
	async updateChapter(
		@Param('id') chapterId: string,
		@Body() dto: UpdateChapterDto
	) {
		return this.ebookService.updateChapter(chapterId, dto);
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
