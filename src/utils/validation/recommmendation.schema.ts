import { z } from 'zod';

export const UpdateRecommendationDtoSchema = z.object({
	genreSlugs: z.array(z.string()).min(1)
})
