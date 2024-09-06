import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { UploadOutputSchema } from '@/src/storage/dto/upload.schema';

extendZodWithOpenApi(z);

export class UploadOutputDto extends createZodDto(UploadOutputSchema) {}
