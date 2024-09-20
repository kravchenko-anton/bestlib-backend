import { GptExplain, TranslateText } from '@/src/reading/reading.dto';
import { Body, Controller, Post } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { ReadingService } from './reading.service';

@ApiBearerAuth()
@Controller('reading')
@ApiTags('😈 reading')
export class ReadingController {
	constructor(private readonly readingService: ReadingService) {}

	@Post('/gpt-explain')
	@ApiBody({ type: GptExplain })
	@ApiOkResponse({ type: String })
	gptExplain(@Body() dto: GptExplain) {
		return this.readingService.gptExplain(dto);
	}

	@Post('/translate')
	@ApiBody({ type: TranslateText })
	@ApiOkResponse({ type: String })
	translate(@Body() dto: TranslateText) {
		return this.readingService.translateText(dto);
	}
}
