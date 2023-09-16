import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../implement';
import { CreateAccountUseCase } from 'src/account/application/use-cases';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  async execute(command: CreateAccountCommand) {
    const { name, accountNumber } = command;

    const accountId = await this.createAccountUseCase.execute(
      name,
      accountNumber,
    );

    return accountId;
  }
}
