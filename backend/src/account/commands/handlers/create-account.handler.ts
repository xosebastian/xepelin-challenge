import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../implement';
import { v4 as uuidv4 } from 'uuid';
import { Account } from '@account/domain/aggregates/account.aggregate';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: CreateAccountCommand) {
    const { name, accountNumber } = command;
    const account = this.publisher.mergeObjectContext(new Account());
    const accountId = uuidv4();
    account.create(accountId, name, accountNumber);
    account.commit();

    return { accountId };
  }
}
