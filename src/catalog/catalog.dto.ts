import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { FeaturedOutputSchema } from '@/src/utils/validation/catalog.schema';

extendZodWithOpenApi(z);

export class FeaturedOutput extends createZodDto(FeaturedOutputSchema) {}
