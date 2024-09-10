export const storageFolder = {
	booksCovers: 'booksCovers' as const,
	authorsPictures: 'authorsPictures' as const
};

export type StorageFolderType = keyof typeof storageFolder;
export const StorageFolderArray: string[] = [
	storageFolder.authorsPictures,
	storageFolder.booksCovers
];
