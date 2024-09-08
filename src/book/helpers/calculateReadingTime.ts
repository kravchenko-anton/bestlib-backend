export const wordsPerMinute = 200;
export const calculateReadingTime = (text: string) => {
	const words = text.split(' ').length;
	const minutes = words / wordsPerMinute;
	return Math.ceil(minutes);
};
