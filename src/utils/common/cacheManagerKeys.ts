export const cacheKeys = {
	library: (userId: string) => `library_${userId}`,
	isSaved: (userId: string, bookId: string) =>
		`isSavedBook_${userId}_${bookId}`,
	featured: (userId: string) => `featured_${userId}`,
	picksOfTheWeek: 'picksOfTheWeek',
	genreCatalog: 'genre_catalog',
	genreById: (genreId: string) => `genreById_${genreId}`,
	authorById: (authorId: string) => `authorById_${authorId}`,
	ebookByBookId: (bookId: string) => `ebookByBookId_${bookId}`,
	bookInfo: (bookId: string) => `bookInfo_${bookId}`,
	bestSellersBooks: 'bestSellersBooks'
};
