import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import {
	AuthOutputSchema,
	AuthSchema,
	GoogleAuthSchema,
	RefreshSchema
} from '@/src/utils/validation/auth.schema';
import { z } from 'zod';

extendZodWithOpenApi(z);

export class AuthOutput extends createZodDto(AuthOutputSchema) {}

export class GoogleAuthDto extends createZodDto(GoogleAuthSchema) {}
export class RefreshDto extends createZodDto(RefreshSchema) {}
export class AuthDto extends createZodDto(AuthSchema) {}
