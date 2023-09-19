import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '@account/domain/repositories';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { CreateAccountUseCase } from '../use-cases';

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
    it('should create an account with the given ID, name and account number', async () => {
      const accountId = '123';
      const name = 'John Doe';
      const accountNumber = '1234567890';

      await useCase.execute(accountId, name, accountNumber);

      expect(accountRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: accountId,
          name,
          accountNumber,
        }),
      );
    });
  });
});
