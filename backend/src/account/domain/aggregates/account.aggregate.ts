import { AggregateRoot } from '@nestjs/cqrs';
import { CreatedAccountEvent } from '../events';

export class Account extends AggregateRoot {
  create(accountId: string, name: string, accountNumber: string) {
    this.apply(new CreatedAccountEvent(accountId, name, accountNumber));
  }
}
