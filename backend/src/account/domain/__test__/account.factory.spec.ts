import { Account } from '../entities';
import { Account as AccountDomain } from '../aggregates/account.aggregate';
import { AccountFactory } from '../factory';

describe('AccountFactory', () => {
  describe('recreate', () => {
    it('should recreate an account with the given ID, name, and balance', () => {
      const accountEntity = new Account();
      accountEntity.id = '123';
      accountEntity.name = 'John Doe';
      accountEntity.balance = 100;
      const account = AccountFactory.recreate(accountEntity);

      expect(account.getId()).toBe(accountEntity.id);
      expect(account.getName()).toBe(accountEntity.name);
      expect(account.getBalance()).toBe(accountEntity.balance);
    });

    it('should create an account with the given ID, name, balance, and account number', () => {
      const accountDomain = new AccountDomain(
        '123',
        'John Doe',
        '1234567890',
        100,
      );
      const account = AccountFactory.create(accountDomain);

      expect(account.id).toBe(accountDomain.getId());
      expect(account.name).toBe(accountDomain.getName());
      expect(account.balance).toBe(accountDomain.getBalance());
      expect(account.accountNumber).toBe(accountDomain.getAccountNumber());
    });
  });
});
