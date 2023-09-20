import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '@account/domain/repositories';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { ACCOUNT_REPOSITORY } from '../injection-tokens';
import { v4 as uuidv4 } from 'uuid';
import { GetAccountBalanceUseCase } from '../use-cases';
describe('GetAccountBalanceUseCase', () => {
  let useCase: GetAccountBalanceUseCase;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAccountBalanceUseCase,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAccountBalanceUseCase>(GetAccountBalanceUseCase);
    accountRepository = module.get<AccountRepository>(ACCOUNT_REPOSITORY);
  });

  describe('execute', () => {
    it('should return the balance of the account', async () => {
      const account = new Account(uuidv4(), 'John Doe', '1234567890');
      account.deposit(100);
      jest.spyOn(accountRepository, 'findById').mockResolvedValueOnce(account);
      const balance = await useCase.execute(account.getId());
      expect(balance).toEqual(100);
    });

    it('should throw an exception if the account is not found', async () => {
      jest
        .spyOn(accountRepository, 'findById')
        .mockResolvedValueOnce(undefined);
      await expect(useCase.execute('non-existent-id')).rejects.toThrowError(
        'Account with ID non-existent-id not found',
      );
    });
  });
});
