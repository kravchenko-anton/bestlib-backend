import { GptExplain, TranslateText } from '@/src/reading/reading.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { ReadingService } from './reading.service'

@Controller('reading')
export class ReadingController {
	constructor(private readonly readingService: ReadingService) {}

	@Post('/gpt-explain')
	@ApiBody({ type: GptExplain })
	gptExplain(@Body() dto: GptExplain) {
		return this.readingService.gptExplain(dto)
	}

	@Post('/translate')
	@ApiBody({ type: TranslateText })
	translate(@Body() dto: TranslateText) {
		return this.readingService.translateText(dto)
	}
}
