export const wordsPerMinute = 200;
export const calculateReadingTime = (words: number) => {
	const minutes = words / wordsPerMinute;
	return Math.ceil(minutes);
};

export const minutesToTime = (minutes: number) => {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return `${hours}h ${remainingMinutes}m`;
};
