import { EbookService } from '@/src/ebook/ebook.service';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';

@Module({
	controllers: [ReactionController],
	providers: [ReactionService, EbookService, PrismaService]
})
export class ReactionModule {}
