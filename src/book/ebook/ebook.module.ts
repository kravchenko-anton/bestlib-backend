import { StorageService } from '@/src/storage/storage.service'
import { Module } from '@nestjs/common'
import { PrismaService } from '../../utils/services/prisma.service'
import { EbookController } from './ebook.controller'
import { EbookService } from './ebook.service'

@Module({
	controllers: [EbookController],
	providers: [EbookService, PrismaService, StorageService]
})
export class EbookModule {}
