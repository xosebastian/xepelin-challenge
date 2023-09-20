import { IEvent } from '@nestjs/cqrs';
import { Account } from '../aggregates/account.aggregate';

export class DepositedFundsEvent implements IEvent {
  constructor(readonly account: Account) {}
}
