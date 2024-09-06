import { z } from 'zod'

export const TranslateTextSchema = z.object({
	targetLang: z.string(),
	text: z.string(),
	context: z.string()
})

export type TranslateTextSchemaType = z.infer<typeof TranslateTextSchema>
