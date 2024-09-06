import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException
} from '@nestjs/common';
import type { Request, Response } from 'express';
import dayjs from 'dayjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			timestamp: dayjs().format(),
			path: request.url,
			message: exception.message
		});
	}
}
