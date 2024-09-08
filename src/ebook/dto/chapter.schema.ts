import { z } from 'zod';

export const ChapterPayloadSchema = z.object({
	title: z.string().refine(value => value !== 'undefined', {
		message: 'Name cannot be empty'
	}),
	content: z.string(),
	position: z.number()
});

export const UnfoldChapterSchema = z
	.object({
		id: z.string()
	})
	.merge(ChapterPayloadSchema.omit({ position: true }));
export const OutputChapterSchema = z.object({
	name: z.string(),
	link: z.string()
});

export type UnfoldChapterType = z.infer<typeof UnfoldChapterSchema>;
export type ChapterType = z.infer<typeof ChapterPayloadSchema>;
