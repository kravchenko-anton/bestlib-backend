import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import {
	HistorySchema,
	UserCatalogOutputSchema,
	UserLibraryOutputSchema,
	UserSchema,
	UserStatisticsSchema
} from '@/src/utils/validation/user.schema';

extendZodWithOpenApi(z);

export class User extends createZodDto(UserSchema) {}

export class ReadingHistory extends createZodDto(HistorySchema) {}
export class UserStatistics extends createZodDto(UserStatisticsSchema) {}
export class UserCatalogOutput extends createZodDto(UserCatalogOutputSchema) {}

export class UserLibraryOutput extends createZodDto(UserLibraryOutputSchema) {}
