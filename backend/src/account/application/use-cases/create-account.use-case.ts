import { Injectable } from '@nestjs/common';
import { Account } from '../../domain/entities';
import { AccountRepository } from '../../domain/repositories';

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(name: string, initialBalance: number): Promise<Account> {
    const account = new Account();
    account.name = name;
    account.balance = initialBalance;

    await this.accountRepository.save(account);

    return account;
  }
}
