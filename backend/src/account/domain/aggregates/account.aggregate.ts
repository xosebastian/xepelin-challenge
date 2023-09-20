import { AggregateRoot } from '@nestjs/cqrs';
import { CreatedAccountEvent, DepositedFundsEvent } from '../events';
import { InternalServerErrorException } from '@nestjs/common';

export class Account extends AggregateRoot {
  constructor(
    private id: string,
    private readonly name: string,
    private readonly accountNumber: string,
    private balance: number = 0,
  ) {
    super();
  }

  create(): void {
    this.apply(new CreatedAccountEvent(this));
  }

  deposit(amount: number): void {
    if (amount < 1) throw new InternalServerErrorException('Invalid amount');
    this.balance = this.balance + amount;
    this.apply(new DepositedFundsEvent(this));
  }

  getBalance(): number {
    return this.balance;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }
}
