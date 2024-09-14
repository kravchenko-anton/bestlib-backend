import { GptExplainSchema, TranslateTextSchema } from '@/src/utils/validation/reading.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);
export class GptExplain extends createZodDto(GptExplainSchema) {}
export class TranslateText extends createZodDto(TranslateTextSchema) {}
