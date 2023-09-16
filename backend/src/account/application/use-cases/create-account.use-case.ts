import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../../domain/entities';
import { AccountRepository } from '@account/domain/repositories';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(
    name: string,
    accountNumber: string,
  ): Promise<Pick<Account, 'id'>> {
    const account = new Account();
    account.name = name;
    account.accountNumber = accountNumber;

    await this.accountRepository.save(account);

    return { id: account.id };
  }
}
