import { HttpException, type HttpStatus } from '@nestjs/common'

export const serverError = (code: HttpStatus, message: string) =>
	new HttpException(
		{
			status: code,
			message
		},
		code
	)
