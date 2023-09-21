import { CommandBus } from '@nestjs/cqrs';

import { TransacionStrategy } from './transaction-strategy.abstract';
import { TransactionDto } from '../dtos';
import { DepositFundsCommand } from '@account/commands/implement';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepositStrategy implements TransacionStrategy {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(payload: TransactionDto): Promise<void> {
    const { accountId, amount } = payload;
    const command = new DepositFundsCommand(accountId, amount);
    return await this.commandBus.execute(command);
  }
}
