import {
	ReactionOutputSchema,
	ReactionPayloadSchema,
	ReactionSchema
} from '@/src/utils/validation/reaction/reaction.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';

extendZodWithOpenApi(z);
export class Reaction extends createZodDto(ReactionSchema) {}
export class ReactionPayload extends createZodDto(ReactionPayloadSchema) {}
export class ReactionOutput extends createZodDto(ReactionOutputSchema) {}
