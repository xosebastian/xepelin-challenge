import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../implement';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { Inject } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from '@account/application/injection-tokens';
import { AccountRepository } from '@account/domain/repositories';
import { AccountAlreadyExistsException } from '../exceptions';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(command: CreateAccountCommand) {
    const { name, accountNumber } = command;

    const existingAccount =
      await this.accountRepository.findByAccountNumber(accountNumber);

    if (existingAccount) {
      throw new AccountAlreadyExistsException();
    }

    const accountId = uuidv4();

    const account = this.publisher.mergeObjectContext(
      new Account(accountId, name, accountNumber),
    );
    account.create();
    account.commit();

    return account.getId();
  }
}
