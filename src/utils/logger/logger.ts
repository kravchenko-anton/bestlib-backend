import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP');

	use(request: Request, response: Response, next: NextFunction): void {
		const { method, originalUrl } = request;
		const startAt = process.hrtime();
		response.on('finish', () => {
			const { statusCode } = response;
			const diff = process.hrtime(startAt);
			const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
			this.logger.log(
				`${method} ${originalUrl.replace('/api', '')} ${statusCode} ${responseTime.toFixed(
					2
				)}s`
			);
		});

		next();
	}
}
