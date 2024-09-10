export const wordsPerMinute = 200;
export const calculateReadingTime = (text: string) => {
	const words = text.split(' ').length;
	const minutes = Math.ceil(words / wordsPerMinute);
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return `${hours}h ${remainingMinutes}m`;
};
