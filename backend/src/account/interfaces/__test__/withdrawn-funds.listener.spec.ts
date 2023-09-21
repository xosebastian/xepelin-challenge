import { Test, TestingModule } from '@nestjs/testing';

import { WithdrawFundsUseCase } from '@account/application/use-cases';
import { EventStoreService } from '@core/infrastructure/eventstore/eventstore.service';
import { WithdrawnFundsEvent } from '@account/domain/events';
import { WithdrawnFundsHandler } from '../listeners';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { Event } from '@core/domain/schemas';
describe('WithdrawnFundsHandler', () => {
  let handler: WithdrawnFundsHandler;
  let withdrawFundsUseCase: WithdrawFundsUseCase;
  let eventStoreService: EventStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawnFundsHandler,
        {
          provide: WithdrawFundsUseCase,
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

    handler = module.get<WithdrawnFundsHandler>(WithdrawnFundsHandler);
    withdrawFundsUseCase =
      module.get<WithdrawFundsUseCase>(WithdrawFundsUseCase);
    eventStoreService = module.get<EventStoreService>(EventStoreService);
  });

  describe('handle', () => {
    it('should withdraw funds and emit a transaction event', async () => {
      const account = new Account('123', 'John', '12345');
      const withdrawnFundsEvent = new WithdrawnFundsEvent(account);
      const event = new Event();

      jest
        .spyOn(withdrawFundsUseCase, 'execute')
        .mockResolvedValueOnce(undefined);
      jest.spyOn(eventStoreService, 'emit').mockResolvedValueOnce(event);

      await handler.handle(withdrawnFundsEvent);

      expect(withdrawFundsUseCase.execute).toHaveBeenCalledWith(account);
      expect(eventStoreService.emit).toHaveBeenCalledWith(
        'Transaction',
        'WithdrawnFundsEvent',
        account,
      );
    });
  });
});
