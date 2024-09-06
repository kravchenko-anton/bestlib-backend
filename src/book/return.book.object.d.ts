import type { Prisma } from '@prisma/client';
export declare const returnBookObject: Pick<Prisma.BookSelect, 'title' | 'picture' | 'author' | 'id' | 'rating'>;
