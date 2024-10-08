import { GenreService } from '@/src/genre/genre.service';
import { Module } from '@nestjs/common';
import { RecommendationService } from '../recommendation/recommendation.service';
import { PrismaService } from '../utils/services/prisma.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
	controllers: [CatalogController],
	providers: [
		CatalogService,
		PrismaService,
		RecommendationService,
		GenreService
	],
	imports: []
})
export class CatalogModule {}
