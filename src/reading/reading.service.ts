import type { GptExplain, TranslateText } from '@/src/reading/reading.dto';
import type { EnvConfig } from '@/src/utils/config/env-config';
import { serverError } from '@/src/utils/helpers/server-error';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TargetLanguageCode } from 'deepl-node';
import * as deepl from 'deepl-node';
import OpenAI from 'openai';

@Injectable()
export class ReadingService {
	private readonly openAi = new OpenAI({
		apiKey: this.configService.get('OPENAI_API_KEY')
	});
	private readonly deepl = new deepl.Translator(
		this.configService.get('DEEPL_API_KEY') as string
	);

	constructor(public configService: ConfigService<EnvConfig>) {}

	async translateText(dto: TranslateText) {
		console.log('try translate', dto);
		return this.deepl.translateText(
			dto.text,
			null,
			dto.targetLang as TargetLanguageCode
		);
	}

	async gptExplain(dto: GptExplain) {
		if (!dto.selectedText || !dto.bookTitle)
			throw serverError(400, 'Problem with explanation');
		console.log('start explanation:', dto);
		return this.openAi.chat.completions
			.create({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: `Explain the word/expression ‘${dto.selectedText.length}’ in a simple and short sentence to make it interesting and understandable. book: ${dto.bookTitle} by ${dto.bookAuthor}. Answer in "${dto.targetLang}" language`
					}
				]
			})
			.catch(error => {
				console.error(error);
				throw serverError(300, 'Failed to generate explanation');
			})
			.then(response => {
				if (!response.choices[0])
					throw serverError(300, 'Failed to generate explanation');
				return response.choices[0].message.content;
			});
	}
}
