import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { GptExplainSchema } from '@/src/reading/dto/gpt-explain.schema';
import { TranslateTextSchema } from '@/src/reading/dto/translate.schema';

extendZodWithOpenApi(z);
export class GptExplain extends createZodDto(GptExplainSchema) {}
export class TranslateText extends createZodDto(TranslateTextSchema) {}
