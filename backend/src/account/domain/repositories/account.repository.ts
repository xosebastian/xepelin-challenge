import { Account } from '../entities/account.entity';

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  save(account: Account): Promise<Account>;
  remove(id: string): Promise<void>;
}
