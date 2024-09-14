import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import { CreateReactionSchema } from '@/src/utils/validation/reaction/create.reaction.schema';
import { UpdateReactionSchema } from '@/src/utils/validation/reaction/update.reaction.schema';
import {
	ReactionByBookOutputSchema,
	ReactionListOutputSchema
} from '@/src/utils/validation/reaction/reaction.schema';

extendZodWithOpenApi(z);
export class CreateReaction extends createZodDto(CreateReactionSchema) {}
export class UpdateReaction extends createZodDto(UpdateReactionSchema) {}

export class ReactionListOutput extends createZodDto(
	ReactionListOutputSchema
) {}
export class ReactionByBookOutput extends createZodDto(
	ReactionByBookOutputSchema
) {}
