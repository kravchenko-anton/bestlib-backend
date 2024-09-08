"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEbookCalculation = exports.charactersPerPage = exports.wordsPerMinute = void 0;
const romanize_number_1 = require("../../utils/helpers/romanize-number");
exports.wordsPerMinute = 200;
exports.charactersPerPage = 2000;
const calculateReadingTime = (text) => {
    const words = text.split(' ').length;
    const minutes = words / exports.wordsPerMinute;
    return Math.ceil(minutes);
};
const useEbookCalculation = (ebooks) => {
    const readingTime = calculateReadingTime(ebooks
        .map(ebook => ebook.chapters.map(chapter => chapter.text).join(' '))
        .join(' '));
    const pagesCount = Math.ceil(ebooks
        .map(ebook => ebook.chapters
        .map(chapter => chapter.text.length)
        .reduce((a, b) => a + b, 0))
        .reduce((a, b) => a + b, 0) / exports.charactersPerPage);
    const uploadedEbook = ebooks.map((ebook, ebookIndex) => ({
        id: (ebookIndex + 1).toString(),
        title: ebook.title,
        chapters: ebook.chapters.map((chapter, chapterIndex) => ({
            id: (chapterIndex + 1).toString(),
            romanNumber: (0, romanize_number_1.convertToRoman)(chapterIndex + 1),
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
exports.useEbookCalculation = useEbookCalculation;
//# sourceMappingURL=get-ebook.js.map