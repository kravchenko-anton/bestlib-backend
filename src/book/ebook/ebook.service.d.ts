import { PrismaService } from '../../utils/services/prisma.service';
import type { StoredEBook } from './dto/ebook.dto';
export declare class EbookService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    storedEbook(slug: string): Promise<StoredEBook[]>;
    ebookBySlug(slug: string): Promise<{
        file: string;
        chapters: {
            title: string;
            children: {
                name: string;
                link: string;
            }[];
        }[];
        id: string;
        picture: string;
        title: string;
        ebook: string;
    }>;
}
