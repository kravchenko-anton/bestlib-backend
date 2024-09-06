import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import {
	ChapterPayloadSchema,
	ChapterSchema
} from '@/src/book/ebook/dto/chapter.schema';
import {
	EbookOutputSchema,
	StoredEBookSchema
} from '@/src/book/ebook/dto/ebook.schema';

extendZodWithOpenApi(z);

export class ChapterType extends createZodDto(ChapterSchema) {}
export class StoredEBook extends createZodDto(StoredEBookSchema) {}
export class BaseChapter extends createZodDto(ChapterPayloadSchema) {}
export class EbookOutput extends createZodDto(EbookOutputSchema) {}
