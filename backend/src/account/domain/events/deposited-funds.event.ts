import { IEvent } from '@nestjs/cqrs';

export class DepositedFundsEvent implements IEvent {
  constructor(
    readonly accountId: string,
    readonly amount: number,
  ) {}
}
