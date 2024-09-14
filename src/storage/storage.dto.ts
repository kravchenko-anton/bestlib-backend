import { UploadOutputSchema } from '@/src/utils/validation/upload.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export class UploadOutputDto extends createZodDto(UploadOutputSchema) {}
