import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAmountException extends HttpException {
  constructor() {
    super(`Amount must be greater than 0.`, HttpStatus.BAD_REQUEST);
  }
}
