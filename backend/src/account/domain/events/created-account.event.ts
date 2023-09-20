import { IEvent } from '@nestjs/cqrs';
import { Account } from '../aggregates/account.aggregate';

export class CreatedAccountEvent implements IEvent {
  constructor(readonly account: Account) {}
}
