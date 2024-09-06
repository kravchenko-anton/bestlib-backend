import { EbookOutput, StoredEBook } from './dto/ebook.dto';
import { EbookService } from './ebook.service';
export declare class EbookController {
    private readonly ebookService;
    constructor(ebookService: EbookService);
    ebookBySlug(bookSlug: string): Promise<EbookOutput>;
    storedEbookBySlug(bookSlug: string): Promise<StoredEBook[]>;
}
