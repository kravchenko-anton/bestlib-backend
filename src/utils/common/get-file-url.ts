export const getFileUrl = (path: string) => {
	if (path?.startsWith('http') || !process.env.STORAGE_URL) return path;
	return `${process.env.STORAGE_URL}/${path}`;
};
