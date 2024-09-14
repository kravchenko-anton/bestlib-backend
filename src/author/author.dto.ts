import { AuthorSchema, CatalogOutputSchema, CreateAuthorSchema } from '@/src/utils/validation/author.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';

extendZodWithOpenApi(z);

export class CreateAuthorDto extends createZodDto(CreateAuthorSchema) {}
export class AuthorDto extends createZodDto(AuthorSchema) {}
export class AuthorCatalogOutput extends createZodDto(CatalogOutputSchema) {}
