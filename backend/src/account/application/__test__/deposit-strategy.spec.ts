import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { DepositFundsCommand } from '@account/commands/implement';

import { TransactionDto } from '../dtos';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { DepositStrategy } from '../strategies';
import { TransactionType } from '@account/domain/enums';

describe('DepositStrategy', () => {
  let depositStrategy: DepositStrategy;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositStrategy,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    depositStrategy = module.get<DepositStrategy>(DepositStrategy);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    it('should send a DepositFundsCommand to the CommandBus', async () => {
      const payload: TransactionDto = {
        accountId: 'account-id',
        amount: 100,
        type: TransactionType.DEPOSIT,
      };
      const expectedCommand = new DepositFundsCommand('account-id', 100);
      const expectedAccount = new Account(
        'account-id',
        'John Doe',
        '1234567890',
      );

      (commandBus.execute as jest.Mock).mockResolvedValueOnce(expectedAccount);

      const result = await depositStrategy.execute(payload);

      expect(commandBus.execute).toHaveBeenCalledWith(expectedCommand);
      expect(result).toBe(expectedAccount);
    });
  });
});
