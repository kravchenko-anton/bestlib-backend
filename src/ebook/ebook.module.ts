import { StorageService } from '@/src/storage/storage.service';
import { Module } from '@nestjs/common';
import { EbookController } from './ebook.controller';
import { EbookService } from './ebook.service';
import { PrismaService } from '@/src/utils/services/prisma.service';

@Module({
	controllers: [EbookController],
	providers: [EbookService, PrismaService, StorageService]
})
export class EbookModule {}
