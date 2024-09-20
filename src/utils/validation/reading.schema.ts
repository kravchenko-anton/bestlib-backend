import { z } from 'zod';

export const GptExplainSchema = z.object({
	selectedText: z.string(),
	bookTitle: z.string(),
	targetLang: z.string(),
	bookAuthor: z.string()
});
export const TranslateTextSchema = z.object({
	targetLang: z.string(),
	text: z.string()
});

export type GptExplainSchemaType = z.infer<typeof GptExplainSchema>;

export type TranslateTextSchemaType = z.infer<typeof TranslateTextSchema>;
