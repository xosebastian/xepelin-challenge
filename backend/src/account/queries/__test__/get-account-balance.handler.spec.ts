import { Test } from '@nestjs/testing';

import { GetAccountBalanceUseCase } from '@account/application/use-cases';
import { GetAccountBalanceQuery } from '../implement';
import { GetAccountBalanceHandler } from '../handlers';

describe('GetAccountBalanceHandler', () => {
  let handler: GetAccountBalanceHandler;
  let useCase: GetAccountBalanceUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAccountBalanceHandler,
        {
          provide: GetAccountBalanceUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = moduleRef.get<GetAccountBalanceHandler>(GetAccountBalanceHandler);
    useCase = moduleRef.get<GetAccountBalanceUseCase>(GetAccountBalanceUseCase);
  });

  describe('execute', () => {
    it('should return the account balance', async () => {
      const query: GetAccountBalanceQuery = { accountId: '123' };
      const balance = 100;
      jest.spyOn(useCase, 'execute').mockResolvedValueOnce(balance);

      const result = await handler.execute(query);

      expect(useCase.execute).toHaveBeenCalledWith(query.accountId);
      expect(result).toBe(balance);
    });
  });
});
