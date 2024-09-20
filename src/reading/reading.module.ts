import { PrismaService } from '@/src/utils/services/prisma.service';
import { Module } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';

@Module({
	controllers: [ReadingController],
	providers: [ReadingService, PrismaService]
})
export class ReadingModule {}
