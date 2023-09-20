import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawFundsCommand } from '@account/commands/implement';
import { TransactionDto } from '../dtos';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { WithdrawStrategy } from '../strategies';
import { TransactionType } from '@account/domain/enums';

describe('WithdrawStrategy', () => {
  let withdrawStrategy: WithdrawStrategy;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawStrategy,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    withdrawStrategy = module.get<WithdrawStrategy>(WithdrawStrategy);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    it('should send a WithdrawFundsCommand to the CommandBus', async () => {
      const payload: TransactionDto = {
        accountId: 'account-id',
        amount: 100,
        type: TransactionType.WITHDRAWAL,
      };
      const expectedCommand = new WithdrawFundsCommand('account-id', 100);
      const expectedAccount = new Account(
        'account-id',
        'John Doe',
        '1234567890',
      );

      (commandBus.execute as jest.Mock).mockResolvedValueOnce(expectedAccount);

      const result = await withdrawStrategy.execute(payload);

      expect(commandBus.execute).toHaveBeenCalledWith(expectedCommand);
      expect(result).toBe(expectedAccount);
    });
  });
});
