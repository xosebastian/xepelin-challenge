import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from 'src/account/domain/entities';
import { AccountRepository } from 'src/account/domain/repositories';

@Injectable()
export class AccountRepositoryImplement implements AccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async findById(id: string): Promise<Account | null> {
    const account = await this.accountRepository.findOneBy({ id });
    return account ?? null;
  }

  async save(account: Account): Promise<Account> {
    const savedAccount = await this.accountRepository.save(account);
    return savedAccount;
  }

  async remove(id: string): Promise<void> {
    await this.accountRepository.delete(id);
  }
}
