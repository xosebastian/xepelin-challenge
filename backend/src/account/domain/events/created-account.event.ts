import { IEvent } from '@nestjs/cqrs';

export class CreatedAccountEvent implements IEvent {
  constructor(
    readonly accountId: string,
    readonly name: string,
    readonly accountNumber: string,
  ) {}
}
