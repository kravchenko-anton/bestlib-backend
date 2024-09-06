import { z } from 'zod';

export const BaseCatalogSchema = z.object({
	canLoadMore: z.boolean(),
	totalPages: z.number()
});
