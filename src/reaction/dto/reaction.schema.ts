// Promise<{id: number, createdAt: Date, type: string, text: string, book: {picture: string, title: string, slug: string, author: string}}[]>

import { z } from 'zod'

export const ReactionListOutputSchema = z.object({
	count: z.number(),
	picture: z.string(),
	slug: z.string(),
	title: z.string(),
	author: z.string()
})

export const ReactionByBookOutputSchema = z.object({
	id: z.string(),
	type: z.string(),
	text: z.string(),
	xpath: z.string(),
	createdAt: z.date(),
	startOffset: z.number(),
	endOffset: z.number()
})
