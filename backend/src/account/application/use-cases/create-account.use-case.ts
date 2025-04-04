import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '@account/domain/repositories';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { Account } from '@account/domain/aggregates/account.aggregate';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(account: Account): Promise<void> {
    await this.accountRepository.save(account);
  }
}
