import type { Prisma } from '@prisma/client'

export const returnUserObject: Pick<Prisma.UserSelect, 'email' | 'id'> = {
	id: true,
	email: true
}
