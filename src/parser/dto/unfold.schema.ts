import { z } from 'zod'

export const UnfoldOutputSchema = z.object({
	chapters: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			text: z.string()
		})
	),
	images: z.array(
		z.object({
			id: z.string(),
			href: z.string(),
			mimeType: z.string(),
			data: z.string()
		})
	)
})
