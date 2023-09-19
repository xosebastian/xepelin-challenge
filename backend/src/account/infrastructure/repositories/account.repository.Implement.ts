import { Account } from '@account/domain/entities';
import { AccountRepository } from '@account/domain/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account as AccountDomain } from '@account/domain/aggregates/account.aggregate';
import { AccountFactory } from '@account/domain/factory';

@Injectable()
export class AccountRepositoryImplement implements AccountRepository {
  constructor(
    @InjectRepository(Account)
    private repository: Repository<Account>,
  ) {}

  async findById(id: string): Promise<AccountDomain | null> {
    const account = await this.repository.findOneBy({ id });
    return account ? this.toDomain(account) : null;
  }

  async save(account: Account): Promise<void> {
    await this.repository.save(account);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async findByAccountNumber(
    accountNumber: string,
  ): Promise<AccountDomain | null> {
    const account = await this.repository.findOneBy({ accountNumber });
    return account ? this.toDomain(account) : null;
  }

  private toDomain(account: Account): AccountDomain {
    return AccountFactory.createFromEntity(account);
  }
}
