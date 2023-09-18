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
    accountId: string,
    name: string,
    accountNumber: string,
  ): Promise<void> {
    const account = new Account();
    account.id = accountId;
    account.name = name;
    account.accountNumber = accountNumber;

    await this.accountRepository.save(account);
  }
}
