import { Test, TestingModule } from '@nestjs/testing';

import { CreateAccountUseCase } from '@account/application/use-cases';
import { CreatedAccountHandler } from '../listeners';
import { EventStoreService } from '@core/infrastructure/eventstore/eventstore.service';
import { CreatedAccountEvent } from '@account/domain/events';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { Event } from '@core/domain/schemas';

describe('CreatedAccountListener', () => {
  let listener: CreatedAccountHandler;
  let createAccountUseCase: CreateAccountUseCase;
  let eventStoreService: EventStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatedAccountHandler,
        {
          provide: CreateAccountUseCase,
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

    listener = module.get<CreatedAccountHandler>(CreatedAccountHandler);
    createAccountUseCase =
      module.get<CreateAccountUseCase>(CreateAccountUseCase);
    eventStoreService = module.get<EventStoreService>(EventStoreService);
  });

  describe('handle', () => {
    it('should create an account and emit an event', async () => {
      // Arrange
      const account = new Account('123', 'John', '12345');
      const createdAccountEvent = new CreatedAccountEvent(account);
      const event = new Event();
      jest
        .spyOn(createAccountUseCase, 'execute')
        .mockResolvedValueOnce(undefined);
      jest.spyOn(eventStoreService, 'emit').mockResolvedValueOnce(event);

      await listener.handle(createdAccountEvent);

      expect(createAccountUseCase.execute).toHaveBeenCalledWith(account);
      expect(eventStoreService.emit).toHaveBeenCalledWith(
        'Account',
        CreatedAccountEvent.name,
        account,
      );
    });
  });
});
