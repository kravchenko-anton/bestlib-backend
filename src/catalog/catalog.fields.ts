/* eslint-disable unicorn/prefer-spread */
import { Prisma } from '@prisma/client'

export const catalogSearchFields = (query: string) =>
	Prisma.validator<Prisma.BookWhereInput>()({
		isPublic: true,
		OR: Array.from([
			{
				title: {
					mode: 'insensitive',
					contains: query
				}
			}
		])
	})
