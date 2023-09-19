import { CreateAccountUseCase } from '@account/application/use-cases';
import { CreatedAccountEvent } from '@account/domain/events';
import { EventStoreService } from '@core/infrastructure/eventstore/eventstore.service';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CreatedAccountEvent)
export class CreatedAccountHandler
  implements IEventHandler<CreatedAccountEvent>
{
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async handle(event: CreatedAccountEvent) {
    const { accountId, name, accountNumber } = event;
    await this.createAccountUseCase.execute(accountId, name, accountNumber);
    await this.eventStoreService.emit('Account', 'CreatedAccountEvent', {
      accountId,
      name,
      accountNumber,
    });
  }
}
