import { AggregateRoot } from '@nestjs/cqrs';
import {
  CreatedAccountEvent,
  DepositedFundsEvent,
  WithdrawnFundsEvent,
} from '../events';
import {
  InsufficientFundsException,
  InvalidAmountException,
} from '../exceptions';

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
    if (amount < 1) throw new InvalidAmountException();
    this.balance = this.balance + amount;
    this.apply(new DepositedFundsEvent(this));
  }

  withdraw(amount: number): void {
    if (amount < 1) throw new InvalidAmountException();
    if (this.balance < amount)
      throw new InsufficientFundsException(amount, this.balance);
    this.balance = this.balance - amount;
    this.apply(new WithdrawnFundsEvent(this));
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
