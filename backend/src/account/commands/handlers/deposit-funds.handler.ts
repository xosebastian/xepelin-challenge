import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DepositFundsCommand } from '../implement';
import { Inject } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from '@account/application/injection-tokens';
import { AccountRepository } from '@account/domain/repositories';

import { AccountNotFoundException } from '@account/application/exceptions';

@CommandHandler(DepositFundsCommand)
export class DepositFundsHandler
  implements ICommandHandler<DepositFundsCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(command: DepositFundsCommand) {
    const { accountId, amount } = command;

    let account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    account = this.publisher.mergeObjectContext(account);
    account.deposit(amount);
    account.commit();
  }
}
