import { CreateReactionSchema } from '@/src/utils/validation/reaction/create.reaction.schema';
import {
	ReactionByBookOutputSchema,
	ReactionListOutputSchema,
	ReactionOutputSchema,
	ReactionPayloadSchema,
	ReactionSchema
} from '@/src/utils/validation/reaction/reaction.schema';
import { UpdateReactionSchema } from '@/src/utils/validation/reaction/update.reaction.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';

extendZodWithOpenApi(z);
export class CreateReaction extends createZodDto(CreateReactionSchema) {}
export class UpdateReaction extends createZodDto(UpdateReactionSchema) {}
export class Reaction extends createZodDto(ReactionSchema) {}
export class ReactionPayload extends createZodDto(ReactionPayloadSchema) {}
export class ReactionOutput extends createZodDto(ReactionOutputSchema) {}
export class ReactionListOutput extends createZodDto(
	ReactionListOutputSchema
) {}
export class ReactionByBookOutput extends createZodDto(
	ReactionByBookOutputSchema
) {}
