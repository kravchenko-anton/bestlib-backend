import type { Prisma } from '@prisma/client'

export const returnReactionObject: Pick<Prisma.ReactionSelect, 'type'> = {
	type: true
}
