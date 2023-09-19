import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'Account not found', HttpStatus.NOT_FOUND);
  }
}
