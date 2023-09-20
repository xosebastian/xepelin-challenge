import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '@account/domain/repositories';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { WithdrawFundsUseCase } from '../use-cases';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { v4 as uuidv4 } from 'uuid';

describe('WithdrawFundsUseCase', () => {
  let useCase: WithdrawFundsUseCase;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawFundsUseCase,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {
            withdraw: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<WithdrawFundsUseCase>(WithdrawFundsUseCase);
    accountRepository = module.get<AccountRepository>(ACCOUNT_REPOSITORY);
  });

  describe('execute', () => {
    const balance = 100;
    const account = new Account(uuidv4(), 'John Doe', '1234567890', balance);

    it('should withdraw funds from the account', async () => {
      account.withdraw(balance);
      await useCase.execute(account);
      expect(accountRepository.withdraw).toHaveBeenCalledWith(
        account.getId(),
        account.getBalance(),
      );
      expect(account.getBalance()).toBe(0);
    });
  });
});
