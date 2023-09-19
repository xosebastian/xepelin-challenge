import { Account } from '../entities';
import { Account as AccountDomain } from '../aggregates/account.aggregate';

export class AccountFactory {
  static createFromEntity(entity: Account) {
    const account = new AccountDomain(
      entity.name,
      entity.accountNumber,
      entity.balance,
      entity.id,
    );
    return account;
  }
}
