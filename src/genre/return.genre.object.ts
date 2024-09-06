import type { Prisma } from '@prisma/client'

export const ReturnGenreObject: Pick<
	Prisma.GenreSelect,
	'name' | 'id' | 'icon' | 'emoji'
> = {
	name: true,
	icon: true,
	id: true,
	emoji: true
}
