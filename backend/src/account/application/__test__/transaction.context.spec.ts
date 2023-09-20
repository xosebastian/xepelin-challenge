import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  DepositStrategy,
  TransactionContext,
  WithdrawStrategy,
} from '../strategies';
import { TransactionType } from '@account/domain/enums';
import { CommandBus } from '@nestjs/cqrs';
import { TransactionDto } from '../dtos';
import { Account } from '@account/domain/aggregates/account.aggregate';

describe('TransactionContext', () => {
  let transactionContext: TransactionContext;
  let depositStrategy: DepositStrategy;
  let withdrawStrategy: WithdrawStrategy;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionContext,
        DepositStrategy,
        WithdrawStrategy,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionContext = module.get<TransactionContext>(TransactionContext);
    depositStrategy = module.get<DepositStrategy>(DepositStrategy);
    withdrawStrategy = module.get<WithdrawStrategy>(WithdrawStrategy);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('getStrategy', () => {
    it('should return the deposit strategy for TransactionType.DEPOSIT', () => {
      const result = transactionContext.getStrategy(TransactionType.DEPOSIT);
      expect(result).toBe(depositStrategy);
    });

    it('should return the withdraw strategy for TransactionType.WITHDRAWAL', () => {
      const result = transactionContext.getStrategy(TransactionType.WITHDRAWAL);
      expect(result).toBe(withdrawStrategy);
    });

    it('should throw a BadRequestException for an unknown transaction type', () => {
      expect(() =>
        transactionContext.getStrategy('unknown-type' as TransactionType),
      ).toThrow(BadRequestException);
    });

    it('should send a Command to the CommandBus', async () => {
      const payload: TransactionDto = {
        accountId: 'account-id',
        amount: 100,
        type: TransactionType.WITHDRAWAL,
      };

      transactionContext.executeStrategy(payload);

      const expectedAccount = new Account(
        'account-id',
        'John Doe',
        '1234567890',
      );

      (commandBus.execute as jest.Mock).mockResolvedValueOnce(expectedAccount);
      const result = await withdrawStrategy.execute(payload);
      expect(result).toBe(expectedAccount);
    });
  });
});
