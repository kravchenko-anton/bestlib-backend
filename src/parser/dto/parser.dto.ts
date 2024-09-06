import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import { UnfoldOutputSchema } from '@/src/parser/dto/unfold.schema';

extendZodWithOpenApi(z);

export class UnfoldOutput extends createZodDto(UnfoldOutputSchema) {}
