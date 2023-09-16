import { Injectable } from '@nestjs/common';
import { Account } from '../../domain/entities';
import { AccountRepository } from '../../domain/repositories';

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

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
