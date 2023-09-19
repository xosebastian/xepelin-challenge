import { ICommand } from '@nestjs/cqrs';

export class WithdrawFundsCommand implements ICommand {
  constructor(
    readonly accountId: string,
    readonly amount: number,
  ) {}
}
