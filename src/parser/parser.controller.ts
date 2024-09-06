import { UnfoldOutput } from '@/src/parser/dto/parser.dto';
import {
	Controller,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { ParserService } from './parser.service';

@Auth('admin')
@ApiTags('📦 parser')
@ApiBearerAuth()
@Controller('parser')
export class ParserController {
	constructor(private readonly parserService: ParserService) {}

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
		return this.parserService.unfold(file);
	}
}
