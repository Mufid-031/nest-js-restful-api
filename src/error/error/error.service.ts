/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService extends Error {
    throwError(statusCode: number, message: string): HttpException {
        return new HttpException(message, statusCode);
    }
}