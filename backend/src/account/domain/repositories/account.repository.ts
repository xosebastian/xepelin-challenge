import { Account } from '../aggregates/account.aggregate';

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  save(account: Account): Promise<void>;
  findByAccountNumber(accountNumber: string): Promise<Account | null>;
  deposit(id: string, amount: number): Promise<void>;
  withdraw(id: string, amount: number): Promise<void>;
}
