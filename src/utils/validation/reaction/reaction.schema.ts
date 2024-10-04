// Promise<{id: number, createdAt: Date, type: string, text: string, book: {picture: string, title: string, slug: string, author: string}}[]>

import { z } from 'zod';

export const ReactionSchema = z.object({
	id: z.string(),
	type: z.string(),
	text: z.string(),
	xpath: z.string(),
	startOffset: z.number(),
	endOffset: z.number(),
	bookId: z.string()
});

export const UpdateReactionSchema = z.object({
	id: z.string(),
	updateObject: z.object({
		type: z.string().optional(),
		text: z.string().optional(),
		xpath: z.string().optional(),
		startOffset: z.number().optional(),
		endOffset: z.number().optional()
	})
});
export const ReactionPayloadSchema = z.object({
	create: z.array(ReactionSchema),
	update: z.array(UpdateReactionSchema),
	delete: z.array(z.string())
});

export const author = z.object({
	id: z.string(),
	name: z.string()
});

export const bookInner = z.object({
	id: z.string(),
	title: z.string(),
	author: author.required(),
	picture: z.string()
});

export const ReactionOutputSchema = z.object({
	id: z.string(),
	type: z.string(),
	text: z.string(),
	xpath: z.string(),
	startOffset: z.number(),
	endOffset: z.number(),
	book: bookInner.required()
});
