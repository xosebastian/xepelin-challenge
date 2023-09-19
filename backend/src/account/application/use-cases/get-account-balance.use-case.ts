import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '@account/domain/repositories';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { AccountNotFoundException } from '../exceptions';

@Injectable()
export class GetAccountBalanceUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(accountId: string): Promise<number> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AccountNotFoundException(
        `Account with ID ${accountId} not found`,
      );
    }
    return account.getBalance();
  }
}
