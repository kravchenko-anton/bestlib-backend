import { returnBookObject } from '@/src/book/return.book.object';
import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { returnUserObject } from '@/src/user/return.user.object';
import { Prisma } from '@prisma/client';

export const userLibraryFields = (userId: string) =>
	({
		where: { id: userId },
		select: Prisma.validator<Prisma.UserSelect>()({
			readingBooks: {
				select: {
					...returnBookObject,
					readingHistory: {
						select: {
							id: true,
							scrollPosition: true,
							endProgress: true,
							endDate: true
						},
						orderBy: {
							endDate: 'desc'
						},
						take: 1
					}
				},
				where: {
					isPublic: true
				}
			},
			finishedBooks: {
				select: returnBookObject,
				where: {
					isPublic: true
				}
			},
			savedBooks: {
				select: returnBookObject,
				where: {
					isPublic: true
				}
			}
		})
	}) as const;

export const userCatalogFields = ({
	page,
	perPage,
	searchTerm
}: {
	page: number;
	perPage: number;
	searchTerm: string;
}) =>
	({
		take: perPage,
		select: Prisma.validator<Prisma.UserSelect>()({
			...returnUserObject,
			picture: true,
			socialId: true,
			role: true,
			createdAt: true,
			fullName: true,
			location: true,
			selectedGenres: {
				select: ReturnGenreObject
			},
			readingHistory: {
				orderBy: {
					endDate: 'asc'
				},
				select: {
					endDate: true,
					progressDelta: true,
					readingTimeMs: true,
					scrollPosition: true,
					startDate: true
				}
			},
			_count: {
				select: {
					savedBooks: true,
					finishedBooks: true,
					readingBooks: true
				}
			}
		}),

		...(page && {
			skip: page * perPage
		}),
		...(searchTerm && {
			where: {
				fullName: {
					contains: searchTerm
				}
			},
			...(searchTerm && {
				where: {
					id: searchTerm
				}
			})
		})
	}) as const;

export const userFinishReadingBookFields = (id: string) =>
	Prisma.validator<Prisma.UserUpdateInput>()({
		readingBooks: {
			disconnect: {
				id
			}
		},
		savedBooks: {
			disconnect: {
				id
			}
		},
		finishedBooks: {
			connect: {
				id
			}
		}
	});

export const userRemoveFromLibraryFields = (id: string) =>
	Prisma.validator<Prisma.UserUpdateInput>()({
		readingBooks: {
			disconnect: {
				id
			}
		},
		savedBooks: {
			disconnect: {
				id
			}
		},
		finishedBooks: {
			disconnect: {
				id
			}
		}
	});

export const userStartReadingBookFields = (id: string) =>
	Prisma.validator<Prisma.UserUpdateInput>()({
		readingBooks: {
			connect: {
				id
			}
		},
		savedBooks: {
			disconnect: {
				id
			}
		},
		finishedBooks: {
			disconnect: {
				id
			}
		}
	});

export const userToggleSaveFields = ({
	isSavedExist,
	id
}: {
	isSavedExist: boolean;
	id: string;
}) =>
	Prisma.validator<Prisma.UserUpdateInput>()({
		savedBooks: {
			[isSavedExist ? 'disconnect' : 'connect']: {
				id
			}
		},
		...(!isSavedExist && {
			readingBooks: {
				disconnect: {
					id
				}
			},
			finishedBooks: {
				disconnect: {
					id
				}
			}
		})
	});
