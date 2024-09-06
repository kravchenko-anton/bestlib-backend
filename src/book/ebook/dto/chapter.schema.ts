import { z } from 'zod'

export const ChapterPayloadSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.refine(value => !value.includes('.epub'), {
			message: 'Name cannot include .epub'
		})
		.refine(value => value !== 'undefined', {
			message: 'Name cannot be empty'
		}),
	text: z.string()
})
export const OutputChapterChildSchema = z.object({
	name: z.string(),
	link: z.string()
})
export const OutputChapterSchema = z.object({
	title: z.string(),
	children: z.array(OutputChapterChildSchema)
})

export const ChapterSchema = z
	.object({
		romanNumber: z.string(),
		readingTime: z.number()
	})
	.merge(ChapterPayloadSchema)

export type ChapterType = z.infer<typeof ChapterSchema>
