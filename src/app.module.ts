import { envConfigSchema } from '@/src/utils/config/env-config';
import { CacheModule } from '@nestjs/cache-manager';
import { type MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { EbookModule } from './book/ebook/ebook.module';
import { CatalogModule } from './catalog/catalog.module';
import { GenreModule } from './genre/genre.module';
import { HealthModule } from './health/health.module';
import { ReactionModule } from './reaction/reaction.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { StorageModule } from './storage/storage.module';
import { UserModule } from './user/user.module';
import { AppLoggerMiddleware } from './utils/logger/logger';
import { ReadingModule } from './reading/reading.module';
import { AuthorModule } from './author/author.module';
import { ParserModule } from '@/src/parser/parser.module';

@Module({
	imports: [
		UserModule,
		CatalogModule,
		ConfigModule.forRoot({
			isGlobal: true,
			validate: config => envConfigSchema.parse(config)
		}),
		GenreModule,
		BookModule,
		AuthModule,
		ParserModule,
		StorageModule,
		CacheModule.register({
			isGlobal: true,
			max: 1000,
			ttl: 60
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60,
				limit: 10
			}
		]),
		RecommendationModule,
		HealthModule,
		EbookModule,
		ReactionModule,
		ReadingModule,
		AuthorModule
	],
	controllers: [AppController],
	providers: [AppService, providePrismaClientExceptionFilter()]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AppLoggerMiddleware).forRoutes('*');
	}
}
