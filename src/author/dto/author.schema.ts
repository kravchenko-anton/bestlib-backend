import { z } from 'zod';

export const CreateAuthorSchema = z.object({
	name: z.string(),
	description: z.string(),
	picture: z.string()
});
export const AuthorSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	picture: z.string()
});

export type CreateAuthorSchemaType = z.infer<typeof CreateAuthorSchema>;
export type AuthorSchemaType = z.infer<typeof AuthorSchema>;
