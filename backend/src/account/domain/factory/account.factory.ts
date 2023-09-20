import { Account } from '../entities';
import { Account as AccountDomain } from '../aggregates/account.aggregate';

export class AccountFactory {
  static createFromEntity(entity: Account) {
    const account = new AccountDomain(
      entity.id,
      entity.name,
      entity.accountNumber,
      Number(entity.balance),
    );

    return account;
  }
  static create(account: AccountDomain): Account {
    const entity = new Account();
    entity.id = account.getId();
    entity.name = account.getName();
    entity.accountNumber = account.getAccountNumber();
    entity.balance = account.getBalance();
    return entity;
  }
}
