import { z } from 'zod';

export const GptExplainSchema = z.object({
	selectedText: z.string(),
	context: z.string(),
	bookTitle: z.string()
})
export const TranslateTextSchema = z.object({
	targetLang: z.string(),
	text: z.string(),
	context: z.string()
})
export type GptExplainSchemaType = z.infer<typeof GptExplainSchema>


export type TranslateTextSchemaType = z.infer<typeof TranslateTextSchema>
