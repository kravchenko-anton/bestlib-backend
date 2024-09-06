import { convertToRoman } from '../../utils/helpers/romanize-number';
import type { StoredEBook } from '../ebook/dto/ebook.dto';
import { EBookPayloadType } from '@/src/book/ebook/dto/ebook.schema';

export const wordsPerMinute = 200;
export const charactersPerPage = 2000;
const calculateReadingTime = (text: string) => {
	const words = text.split(' ').length;
	const minutes = words / wordsPerMinute;
	return Math.ceil(minutes);
};

export const useEbookCalculation = (
	ebooks: EBookPayloadType[]
): {
	readingTime: number;
	uploadedEbook: StoredEBook[];
	pagesCount: number;
	chaptersCount: number;
} => {
	const readingTime = calculateReadingTime(
		ebooks
			.map(ebook => ebook.chapters.map(chapter => chapter.text).join(' '))
			.join(' ')
	);
	const pagesCount = Math.ceil(
		ebooks
			.map(ebook =>
				ebook.chapters
					.map(chapter => chapter.text.length)
					.reduce((a, b) => a + b, 0)
			)
			.reduce((a, b) => a + b, 0) / charactersPerPage
	);

	const uploadedEbook = ebooks.map((ebook, ebookIndex) => ({
		id: (ebookIndex + 1).toString(),
		title: ebook.title,
		chapters: ebook.chapters.map((chapter, chapterIndex) => ({
			id: (chapterIndex + 1).toString(),
			romanNumber: convertToRoman(chapterIndex + 1),
			readingTime: calculateReadingTime(chapter.text),
			name: chapter.name,
			text: chapter.text
		}))
	}));

	const chaptersCount = ebooks
		.map(ebook => ebook.chapters.length)

		.reduce((a, b) => a + b, 0);
	return {
		uploadedEbook,
		readingTime,
		pagesCount,
		chaptersCount
	};
};
