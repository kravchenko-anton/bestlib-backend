import { Catch, type ArgumentsHost } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import * as Sentry from '@sentry/node'

@Catch()
export class SentryFilter extends BaseExceptionFilter {
	override catch(exception: unknown, host: ArgumentsHost) {
		Sentry.captureException(exception)
		super.catch(exception, host)
	}
}
