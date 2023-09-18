import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountAlreadyExistsException extends HttpException {
  constructor() {
    super('Account already exists', HttpStatus.CONFLICT);
  }
}
