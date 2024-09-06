export const storageFolder = {
	ebooks: 'ebooks' as const,
	booksCovers: 'booksCovers' as const,
	imagesInBook: 'imagesInBook' as const
};

export type StorageFolderType = keyof typeof storageFolder;
export const StorageFolderArray: string[] = [
	storageFolder.ebooks,
	storageFolder.booksCovers,
	storageFolder.imagesInBook
];
