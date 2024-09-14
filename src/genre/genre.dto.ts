import { FindOneGenreOutputSchema } from '@/src/utils/validation/genre/genre.schema';
import { ShortGenreSchema } from '@/src/utils/validation/short-genre.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export class FindOneGenreOutput extends createZodDto(
	FindOneGenreOutputSchema
) {}

export class ShortGenre extends createZodDto(ShortGenreSchema) {}
