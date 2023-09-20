import { CommandBus } from '@nestjs/cqrs';

import { TransacionStrategy } from './transaction-strategy.abstract';
import { TransactionDto } from '../dtos';
import { WithdrawFundsCommand } from '@account/commands/implement';
import { Injectable } from '@nestjs/common';
import { Account } from '@account/domain/aggregates/account.aggregate';
@Injectable()
export class WithdrawStrategy implements TransacionStrategy {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(payload: TransactionDto): Promise<Account> {
    const { accountId, amount } = payload;
    const command = new WithdrawFundsCommand(accountId, amount);
    await this.commandBus.execute(command);
    return null;
  }
}
