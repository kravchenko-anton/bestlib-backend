import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import { UnfoldChapterSchema } from '@/src/ebook/dto/chapter.schema';
import {
	EbookOutputSchema,
	UnfoldOutputSchema
} from '@/src/ebook/dto/ebook.schema';

extendZodWithOpenApi(z);
export class UnfoldChapter extends createZodDto(UnfoldChapterSchema) {}
export class UnfoldOutput extends createZodDto(UnfoldOutputSchema) {}
export class EbookOutput extends createZodDto(EbookOutputSchema) {}
