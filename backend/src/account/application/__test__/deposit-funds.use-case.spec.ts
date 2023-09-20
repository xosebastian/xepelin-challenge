import { Test, TestingModule } from '@nestjs/testing';

import { AccountRepository } from '@account/domain/repositories';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { v4 as uuidv4 } from 'uuid';
import { DespositFundsUseCase } from '../use-cases';

describe('DespositFundsUseCase', () => {
  let useCase: DespositFundsUseCase;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DespositFundsUseCase,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {
            deposit: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<DespositFundsUseCase>(DespositFundsUseCase);
    accountRepository = module.get<AccountRepository>(ACCOUNT_REPOSITORY);
  });

  describe('execute', () => {
    it('should deposit funds to the account', async () => {
      const balance = 100;
      const account = new Account(uuidv4(), 'John Doe', '1234567890');
      account.deposit(balance);
      await useCase.execute(account);
      expect(accountRepository.deposit).toHaveBeenCalledWith(
        account.getId(),
        account.getBalance(),
      );
      expect(account.getBalance()).toBe(balance);
    });
  });
});
