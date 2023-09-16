import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../implement';
import { CreateAccountUseCase } from '@account/application/use-cases';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  async execute(command: CreateAccountCommand) {
    const { name, accountNumber } = command;

    console.log('CreateAccountHandler.execute()');

    console.log('name: ', name);

    const accountId = await this.createAccountUseCase.execute(
      name,
      accountNumber,
    );

    return accountId;
  }
}
