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
	constructor(public configService: ConfigService<EnvConfig>) {}

	private readonly openAi = new OpenAI({
		apiKey: this.configService.get('OPENAI_API_KEY')
	});
	private readonly deepl = new deepl.Translator(
		this.configService.get('DEEPL_API_KEY') as string
	);
	async translateText(dto: TranslateText) {
		return this.deepl.translateText(
			dto.text,
			null,
			dto.targetLang as TargetLanguageCode,
			{
				context: dto.context
			}
		);
	}

	async gptExplain(dto: GptExplain) {
		return this.openAi.chat.completions
			.create({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: `
							Analyze the selected text from the book "${dto.bookTitle}".
							Selected Text: "${dto.selectedText}"
							Context: "${dto.context}"
							Please provide:
							1. Its significance within the context.
							2. Its role in the narrative or character development.
							3. The author's intended meaning.
							4. Any subtextual meanings.
							5. Its impact on the reader.
							Summarize in 2-3 sentences.Without mentioning the title of the book or the character's name.
							`
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
