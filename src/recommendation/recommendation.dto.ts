import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

export const UpdateRecommendationDtoSchema = z.object({
	genreSlugs: z.array(z.string()).min(1)
})

export class UpdateRecommendationDto extends createZodDto(
	UpdateRecommendationDtoSchema
) {}
