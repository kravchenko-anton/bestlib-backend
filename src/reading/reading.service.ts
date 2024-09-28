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
		console.log('translateText called with:', dto);
		try {
			const result = await this.deepl.translateText(
				dto.text,
				null,
				dto.targetLang as TargetLanguageCode
			);
			console.log('translateText result:', result);
			return result;
		} catch (error) {
			console.error('translateText error:', error);
			throw error;
		}
	}

	async gptExplain(dto: GptExplain) {
		console.log('gptExplain called with:', dto);
		if (!dto.selectedText || !dto.bookTitle) {
			console.error('gptExplain error: Problem with explanation');
			throw serverError(400, 'Problem with explanation');
		}
		try {
			const response = await this.openAi.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: `Explain the word/expression ‘${dto.selectedText.length}’ in a simple and short sentence to make it interesting and understandable. book: ${dto.bookTitle} by ${dto.bookAuthor}. Answer in "${dto.targetLang}" language`
					}
				]
			});
			if (!response.choices[0]) {
				console.error('gptExplain error: Failed to generate explanation');
				throw serverError(300, 'Failed to generate explanation');
			}
			const explanation = response.choices[0].message.content;
			console.log('gptExplain result:', explanation);
			return explanation;
		} catch (error) {
			console.error('gptExplain error:', error);
			throw serverError(300, 'Failed to generate explanation');
		}
	}
}
