import { TransactionType } from '@account/domain/enums';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DepositStrategy } from './deposit-strategy';
import { WithdrawStrategy } from './withdraw-strategy';
import { TransacionStrategy } from './transaction-strategy.abstract';
import { TransactionDto } from '../dtos';

@Injectable()
export class TransactionContext {
  private strategies = new Map<TransactionType, TransacionStrategy>();

  constructor(
    @Inject(DepositStrategy)
    private readonly depositStrategy: TransacionStrategy,
    @Inject(WithdrawStrategy)
    private readonly withdrawStrategy: TransacionStrategy,
  ) {
    this.strategies.set(TransactionType.DEPOSIT, this.depositStrategy);
    this.strategies.set(TransactionType.WITHDRAWAL, this.withdrawStrategy);
  }

  private getStrategy(type: TransactionType): TransacionStrategy {
    if (!this.strategies.has(type)) {
      throw new BadRequestException(`Strategy not found for ${type}`);
    }
    return this.strategies.get(type);
  }

  public async executeStrategy(payload: TransactionDto): Promise<void> {
    const { type } = payload;
    const strategy = this.getStrategy(type);
    await strategy.execute(payload);
  }
}
