import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import {
	ChapterSchema,
	UnfoldChapterSchema,
	UpdateChapterSchema
} from '@/src/utils/validation/ebook/chapter.schema';
import {
	EbookOutputSchema,
	UnfoldOutputSchema
} from '@/src/utils/validation/ebook/ebook.schema';

extendZodWithOpenApi(z);
export class UnfoldChapter extends createZodDto(UnfoldChapterSchema) {}
export class Chapter extends createZodDto(ChapterSchema) {}
export class UpdateChapterDto extends createZodDto(UpdateChapterSchema) {}
export class UnfoldOutput extends createZodDto(UnfoldOutputSchema) {}
export class EbookOutput extends createZodDto(EbookOutputSchema) {}
