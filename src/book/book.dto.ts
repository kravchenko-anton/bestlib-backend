import {
	BookSchema,
	CatalogOutputSchema,
	FullBookSchema,
	infoByIdSchema,
	ShortBookSchema
} from '@/src/utils/validation/book/book.schema';
import { CreateBookSchema } from '@/src/utils/validation/book/create.book.schema';
import { UpdateBookSchema } from '@/src/utils/validation/book/update.book.schema';
import { ImpressionSchema } from '@/src/utils/validation/impression.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';

extendZodWithOpenApi(z);
export class CreateImpressionDto extends createZodDto(ImpressionSchema) {}
export class CreateBookDto extends createZodDto(CreateBookSchema) {}
export class ShortBook extends createZodDto(ShortBookSchema) {}
export class UpdateBookDto extends createZodDto(UpdateBookSchema) {}
export class Book extends createZodDto(BookSchema) {}
export class FullBook extends createZodDto(FullBookSchema) {}
export class BookCatalogOutput extends createZodDto(CatalogOutputSchema) {}
export class InfoById extends createZodDto(infoByIdSchema) {}
