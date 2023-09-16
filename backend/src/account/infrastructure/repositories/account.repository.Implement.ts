import { Account } from '@account/domain/entities';
import { AccountRepository } from '@account/domain/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepositoryImplement implements AccountRepository {
  constructor(
    @InjectRepository(Account)
    private repository: Repository<Account>,
  ) {}

  async findById(id: string): Promise<Account | null> {
    const account = await this.repository.findOneBy({ id });
    return account ?? null;
  }

  async save(account: Account): Promise<Account> {
    const savedAccount = await this.repository.save(account);
    return savedAccount;
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
