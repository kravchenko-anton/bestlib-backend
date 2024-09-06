import type { StoredEBook } from '../ebook/dto/ebook.dto';
import { EBookPayloadType } from '@/src/book/ebook/dto/ebook.schema';
export declare const wordsPerMinute = 200;
export declare const charactersPerPage = 2000;
export declare const useEbookCalculation: (ebooks: EBookPayloadType[]) => {
    readingTime: number;
    uploadedEbook: StoredEBook[];
    pagesCount: number;
    chaptersCount: number;
};
