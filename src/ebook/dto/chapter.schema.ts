import { z } from 'zod';

export const ChapterSchema = z.object({
	title: z.string().refine(value => value !== 'undefined', {
		message: 'Name cannot be empty'
	}),
	content: z.string(),
	position: z.number(),
	id: z.string()
});

export const UpdateChapterSchema = z.object({
	title: z
		.string()
		.refine(value => value !== 'undefined', {
			message: 'Name cannot be empty'
		})
		.optional(),
	content: z.string().optional(),
	position: z.number().optional()
});

export const ChapterPayloadSchema = ChapterSchema.omit({ id: true });

export const UnfoldChapterSchema = ChapterSchema.omit({ position: true });
export const OutputChapterSchema = z.object({
	title: z.string(),
	link: z.string()
});

export type UnfoldChapterType = z.infer<typeof UnfoldChapterSchema>;
export type ChapterType = z.infer<typeof ChapterPayloadSchema>;
