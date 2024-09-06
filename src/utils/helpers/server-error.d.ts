import { HttpException, type HttpStatus } from '@nestjs/common';
export declare const serverError: (code: HttpStatus, message: string) => HttpException;
