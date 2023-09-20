import { Account } from '../aggregates/account.aggregate';
import {
  CreatedAccountEvent,
  DepositedFundsEvent,
  WithdrawnFundsEvent,
} from '../events';
import {
  InsufficientFundsException,
  InvalidAmountException,
} from '../exceptions';

describe('Account', () => {
  describe('deposit', () => {
    it('should emit a CreatedAccountEvent with the account as the payload', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');
      account.create();
      const event = new CreatedAccountEvent(account);
      expect(account.getUncommittedEvents()).toContainEqual(event);
      expect(account.getBalance()).toBe(0);
      expect(account.getId()).toBe('account-id');
      expect(account.getName()).toBe('John Doe');
      expect(account.getAccountNumber()).toBe('1234567890');
    });

    it('should increase the account balance by the deposit amount', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');
      account.deposit(100);
      expect(account.getBalance()).toBe(100);
    });

    it('should throw an InvalidAmountException if the deposit amount is less than 1', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');

      expect(() => account.deposit(0)).toThrowError(InvalidAmountException);
      expect(() => account.deposit(-100)).toThrowError(InvalidAmountException);
    });

    it('should emit a DepositedFundsEvent with the account as the payload', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');
      const event = new DepositedFundsEvent(account);

      account.deposit(100);

      expect(account.getUncommittedEvents()).toContainEqual(event);
    });
  });

  describe('withdraw', () => {
    it('should decrease the account balance by the withdrawal amount', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');
      account.deposit(100);
      account.withdraw(50);

      expect(account.getBalance()).toBe(50);
    });

    it('should throw an InsufficientFundsException if the withdrawal amount is greater than the account balance', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');
      account.deposit(100);

      expect(() => account.withdraw(200)).toThrowError(
        InsufficientFundsException,
      );
    });

    it('should throw an InvalidAmountException if the withdrawal amount is less than 1', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');
      account.deposit(100);

      expect(() => account.withdraw(0)).toThrowError(InvalidAmountException);
      expect(() => account.withdraw(-100)).toThrowError(InvalidAmountException);
    });

    it('should emit a WithdrawnFundsEvent with the account as the payload', () => {
      const account = new Account('account-id', 'John Doe', '1234567890');
      account.deposit(100);
      const event = new WithdrawnFundsEvent(account);

      account.withdraw(50);

      expect(account.getUncommittedEvents()).toContainEqual(event);
    });
  });
});
