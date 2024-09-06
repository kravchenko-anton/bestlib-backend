import { UpdateBookDto } from './dto/book.dto';
declare const UpdateBookDtoExtended_base: import("@nestjs/common").Type<Pick<UpdateBookDto, "picture" | "description" | "title" | "rating" | "isPublic">>;
export declare class UpdateBookDtoExtended extends UpdateBookDtoExtended_base {
    ebook?: string;
    pagesCount?: number;
    slug?: string;
    author?: {
        connect: {
            id: string;
        };
    };
    readingTime?: number;
    chapters?: number;
    genres?: {
        set: {
            id: string;
        }[];
    };
    mainGenre?: {
        connect: {
            id: string;
        };
    };
}
export {};
