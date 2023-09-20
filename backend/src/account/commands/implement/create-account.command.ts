import { ICommand } from '@nestjs/cqrs';

export class CreateAccountCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly accountNumber: string,
    readonly balance: number,
  ) {}
}
