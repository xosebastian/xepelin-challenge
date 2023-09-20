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

  async save(account: AccountDomain): Promise<void> {
    const entity = this.toEntity(account);
    await this.repository.save(entity);
  }

  async deposit(id: string, amount: number) {
    await this.repository.update(id, { balance: amount });
  }

  async withdraw(id: string, amount: number) {
    await this.repository.update(id, { balance: amount });
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
  private toEntity(account: AccountDomain): Account {
    return AccountFactory.create(account);
  }
}
