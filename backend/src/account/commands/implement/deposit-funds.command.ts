import { ICommand } from '@nestjs/cqrs';

export class DepositFundsCommand implements ICommand {
  constructor(
    readonly accountId: string,
    readonly amount: number,
  ) {}
}
