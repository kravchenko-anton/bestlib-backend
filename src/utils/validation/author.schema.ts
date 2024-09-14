import { BookSchema, ShortBookSchema } from '@/src/utils/validation/book/book.schema'
import { z } from 'zod';
import { BaseCatalogSchema } from '../../utils/common/base.catalog.schema';

export const CreateAuthorSchema = z.object({
	name: z.string(),
	description: z.string(),
	photo: z.string()
});


export const AuthorSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	picture: z.string(),
	books: z.array(ShortBookSchema.omit({author: true}))
})

export const CatalogOutputSchema = z
	.object({
		data: z.array(AuthorSchema)
	})
	.merge(BaseCatalogSchema);

export type CreateAuthorSchemaType = z.infer<typeof CreateAuthorSchema>;
export type AuthorSchemaType = z.infer<typeof AuthorSchema>;
