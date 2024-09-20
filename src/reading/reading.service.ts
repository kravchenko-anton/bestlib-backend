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
		return this.deepl.translateText(
			dto.text,
			null,
			dto.targetLang as TargetLanguageCode
		);
	}

	async gptExplain(dto: GptExplain) {
		if (!dto.selectedText || !dto.bookTitle)
			throw serverError(400, 'Problem with explanation');
		return this.openAi.chat.completions
			.create({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: `
							Book "${dto.bookTitle}" by ${dto.bookAuthor}.
							Selected Text: ${dto.selectedText}.
							Target Language: ${dto.targetLang}.
							Analyze the following line with clarity and precision, focusing on its meaning, tone, and intent. Provide an interpretation that reflects the perspective of a thoughtful and refined individual. Be concise, insightful, and maintain a formal tone throughout
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
