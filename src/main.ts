import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './utils/common/http-exception.filter'
import { SentryFilter } from './utils/common/sentry'
import {
	openApiConfig,
	typesGeneratorConfig
} from './utils/config/open-api.config'


async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new HttpExceptionFilter())
	app.enableCors({})
	app.use(helmet())
	app.useGlobalPipes(new ZodValidationPipe())
	await OpenApiNestFactory.configure(app, openApiConfig, typesGeneratorConfig)
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		environment: process.env.NODE_ENV || 'development',
		tracesSampleRate: 1,

		// Set sampling rate for profiling
		// This is relative to tracesSampleRate
		profilesSampleRate: 1
	}) // Sentry configuration
	app.useGlobalFilters(new SentryFilter(httpAdapter))
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	await app.listen(process.env.PORT || 3000)
}

// run yarn add sharp --ignore-engines
// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap()
