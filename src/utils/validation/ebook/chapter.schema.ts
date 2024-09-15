import { z } from 'zod';

export const ChapterSchema = z.object({
	title: z.string().refine(value => value !== 'undefined', {
		message: 'Name cannot be empty'
	}),
	content: z.string(),
	position: z.number(),
	id: z.string(),
	wordCount: z.number().positive().min(5),
	symbolCount: z.number().positive().min(5)
});

export const UpdateChapterSchema = z.object({
	title: z
		.string()
		.refine(value => value !== 'undefined', {
			message: 'Name cannot be empty'
		})
		.optional(),
	content: z.string().optional(),
	position: z.number().optional(),
	wordCount: z.number().positive().min(5).optional(),
	symbolCount: z.number().positive().min(5).optional()
});

export const ChapterPayloadSchema = ChapterSchema.omit({ id: true });
export const UnfoldChapterSchema = ChapterSchema.omit({
	position: true,
	symbolCount: true,
	wordCount: true
});
export const OutputChapterSchema = z.object({
	title: z.string(),
	link: z.string()
});

export type UnfoldChapterType = z.infer<typeof UnfoldChapterSchema>;
export type ChapterType = z.infer<typeof ChapterPayloadSchema>;
