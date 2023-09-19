import { Account } from '../entities/account.entity';
import { Account as AccountDomain } from '../aggregates/account.aggregate';

export interface AccountRepository {
  findById(id: string): Promise<AccountDomain | null>;
  save(account: Account): Promise<void>;
  remove(id: string): Promise<void>;
  findByAccountNumber(accountNumber: string): Promise<AccountDomain | null>;
}
