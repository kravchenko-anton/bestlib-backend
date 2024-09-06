import { z } from 'zod'

export const UploadOutputSchema = z.object({
	name: z.string()
})
