import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import { CreateReactionSchema } from '@/src/reaction/dto/create.reaction.schema';
import { UpdateReactionSchema } from '@/src/reaction/dto/update.reaction.schema';
import {
	ReactionByBookOutputSchema,
	ReactionListOutputSchema
} from '@/src/reaction/dto/reaction.schema';

extendZodWithOpenApi(z);
export class CreateReaction extends createZodDto(CreateReactionSchema) {}
export class UpdateReaction extends createZodDto(UpdateReactionSchema) {}

export class ReactionListOutput extends createZodDto(
	ReactionListOutputSchema
) {}
export class ReactionByBookOutput extends createZodDto(
	ReactionByBookOutputSchema
) {}
