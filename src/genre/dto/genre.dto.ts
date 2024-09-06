import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { FindOneGenreOutputSchema } from '@/src/genre/dto/genre.schema';
import { ShortGenreSchema } from '@/src/genre/dto/short-genre.schema';

extendZodWithOpenApi(z);

export class FindOneGenreOutput extends createZodDto(
	FindOneGenreOutputSchema
) {}

export class ShortGenre extends createZodDto(ShortGenreSchema) {}
