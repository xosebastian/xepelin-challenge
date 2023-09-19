import { TransactionDto } from '@account/application/dtos';
import { TransactionContext } from '@account/application/strategies';
import { Body, Controller, Post } from '@nestjs/common';

@Controller({ path: 'transactions' })
export class TransacionController {
  constructor(private readonly transactionContex: TransactionContext) {}

  @Post()
  async handleTransaction(@Body() payload: TransactionDto) {
    return this.transactionContex.executeStrategy(payload);
  }
}
