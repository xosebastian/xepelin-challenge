import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '@account/domain/repositories';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { Account } from '@account/domain/aggregates/account.aggregate';

@Injectable()
export class WithdrawFundsUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(account: Account): Promise<void> {
    this.accountRepository.withdraw(account.getId(), account.getBalance());
  }
}
