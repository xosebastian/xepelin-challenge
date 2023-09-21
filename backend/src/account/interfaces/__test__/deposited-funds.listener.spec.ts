import { Test, TestingModule } from '@nestjs/testing';

import { DespositFundsUseCase } from '@account/application/use-cases';
import { EventStoreService } from '@core/infrastructure/eventstore/eventstore.service';
import { DepositedFundsEvent } from '@account/domain/events';
import { DepositedFundsHandler } from '../listeners';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { Event } from '@core/domain/schemas';

describe('DepositedFundsHandler', () => {
  let handler: DepositedFundsHandler;
  let depositFundsUseCase: DespositFundsUseCase;
  let eventStoreService: EventStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositedFundsHandler,
        {
          provide: DespositFundsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: EventStoreService,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<DepositedFundsHandler>(DepositedFundsHandler);
    depositFundsUseCase =
      module.get<DespositFundsUseCase>(DespositFundsUseCase);
    eventStoreService = module.get<EventStoreService>(EventStoreService);
  });

  describe('handle', () => {
    it('should deposit funds and emit a transaction event', async () => {
      // Arrange
      const account = new Account('123', 'John', '12345');
      const depositedFundsEvent = new DepositedFundsEvent(account);
      const event = new Event();
      jest
        .spyOn(depositFundsUseCase, 'execute')
        .mockResolvedValueOnce(undefined);
      jest.spyOn(eventStoreService, 'emit').mockResolvedValueOnce(event);

      await handler.handle(depositedFundsEvent);

      expect(depositFundsUseCase.execute).toHaveBeenCalledWith(account);
      expect(eventStoreService.emit).toHaveBeenCalledWith(
        'Transaction',
        'DepositedFundsEvent',
        account,
      );
    });
  });
});
