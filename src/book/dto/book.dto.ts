import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import { CreateBookSchema } from '@/src/book/dto/create.book.schema';
import {
	BookSchema,
	CatalogOutputSchema,
	FullBookSchema,
	infoBySlugSchema,
	ShortBookSchema
} from '@/src/book/dto/book.schema';
import { UpdateBookSchema } from '@/src/book/dto/update.book.schema';

extendZodWithOpenApi(z);

export class CreateBookDto extends createZodDto(CreateBookSchema) {}
export class ShortBook extends createZodDto(ShortBookSchema) {}
export class UpdateBookDto extends createZodDto(UpdateBookSchema) {}
export class Book extends createZodDto(BookSchema) {}
export class FullBook extends createZodDto(FullBookSchema) {}
export class CatalogOutput extends createZodDto(CatalogOutputSchema) {}
export class InfoBySlug extends createZodDto(infoBySlugSchema) {}
