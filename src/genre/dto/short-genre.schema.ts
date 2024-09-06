import { z } from 'zod'

export const ShortGenreSchema = z.object({
	id: z.string(),
	name: z.string(),
	icon: z.string(),
	emoji: z.string()
})
