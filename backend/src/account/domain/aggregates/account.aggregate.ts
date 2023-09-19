import { AggregateRoot } from '@nestjs/cqrs';
import { CreatedAccountEvent, DepositedFundsEvent } from '../events';
import { InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export class Account extends AggregateRoot {
  constructor(
    private readonly name: string,
    private readonly accountNumber: string,
    private balance: number = 0,
    private id: string = uuidv4(),
  ) {
    super();
    if (this.id) {
      this.id = uuidv4();
    }
  }

  create(): void {
    this.apply(new CreatedAccountEvent(this.id, this.name, this.accountNumber));
  }

  deposit(amount: number): void {
    if (amount < 1) throw new InternalServerErrorException('Invalid amount');
    this.balance += amount;
    this.apply(new DepositedFundsEvent(this.id, amount));
  }

  getBalance(): number {
    return this.balance;
  }

  getId(): string {
    return this.id;
  }
}
