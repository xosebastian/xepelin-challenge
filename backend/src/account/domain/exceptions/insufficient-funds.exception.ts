import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientFundsException extends HttpException {
  constructor(amount: number, balance: number) {
    super(
      `Attempted to withdraw ${amount} with a balance of ${balance}. Insufficient funds.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
