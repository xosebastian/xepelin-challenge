import { IEvent } from '@nestjs/cqrs';
import { Account } from '../aggregates/account.aggregate';

export class WithdrawnFundsEvent implements IEvent {
  constructor(readonly account: Account) {}
}
