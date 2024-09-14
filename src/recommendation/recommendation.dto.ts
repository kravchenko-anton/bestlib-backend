import { UpdateRecommendationDtoSchema } from '@/src/utils/validation/recommmendation.schema';
import { createZodDto } from '@anatine/zod-nestjs'

export class UpdateRecommendationDto extends createZodDto(
	UpdateRecommendationDtoSchema
) {}
