import { Test, TestingModule } from '@nestjs/testing';

import { AccountRepository } from '@account/domain/repositories';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { CreateAccountUseCase } from '../use-cases';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { v4 as uuidv4 } from 'uuid';

describe('CreateAccountUseCase', () => {
  let useCase: CreateAccountUseCase;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountUseCase,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
    accountRepository = module.get<AccountRepository>(ACCOUNT_REPOSITORY);
  });

  describe('execute', () => {
    it('should save the account to the repository', async () => {
      const account = new Account(uuidv4(), 'John Doe', '1234567890');
      await useCase.execute(account);
      expect(accountRepository.save).toHaveBeenCalledWith(account);
    });
  });
});
