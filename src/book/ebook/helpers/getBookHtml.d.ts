import { ChapterType } from '@/src/book/ebook/dto/chapter.schema';
export interface GetServerBookHtmlType extends Pick<ChapterType, 'romanNumber' | 'readingTime' | 'name' | 'text'> {
    sectionId: string;
    id: string;
}
export declare const getServerBookHtml: ({ name, text, sectionId, readingTime, romanNumber }: GetServerBookHtmlType) => string;
