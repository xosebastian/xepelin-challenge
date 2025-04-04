import { Test, TestingModule } from '@nestjs/testing';

import { TransactionContext } from '@account/application/strategies';
import { TransactionDto } from '@account/application/dtos';
import { TransacionController } from '../api';
import { TransactionType } from '@account/domain/enums';

describe('TransacionController', () => {
  let controller: TransacionController;
  let mockTransactionContext: jest.Mocked<TransactionContext>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacionController],
      providers: [
        {
          provide: TransactionContext,
          useValue: {
            executeStrategy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransacionController>(TransacionController);
    mockTransactionContext = module.get<TransactionContext>(
      TransactionContext,
    ) as jest.Mocked<TransactionContext>;
  });

  describe('handleTransaction', () => {
    it('should handle a transaction and return its result', async () => {
      const mockDto: TransactionDto = {
        accountId: 'mocked-uuid',
        amount: 100,
        type: TransactionType.DEPOSIT,
      };
      mockTransactionContext.executeStrategy.mockResolvedValue();

      await controller.handleTransaction(mockDto);

      expect(mockTransactionContext.executeStrategy).toHaveBeenCalledWith(
        mockDto,
      );
    });
  });
});
