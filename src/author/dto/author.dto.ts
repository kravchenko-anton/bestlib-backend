import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import {
	AuthorSchema,
	CatalogOutputSchema,
	CreateAuthorSchema
} from '@/src/author/dto/author.schema';
import { z } from 'zod';

extendZodWithOpenApi(z);

export class CreateAuthorDto extends createZodDto(CreateAuthorSchema) {}
export class AuthorDto extends createZodDto(AuthorSchema) {}
export class AuthorCatalogOutput extends createZodDto(CatalogOutputSchema) {}
