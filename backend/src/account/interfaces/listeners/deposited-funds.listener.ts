import { DespositFundsUseCase } from '@account/application/use-cases';
import { DepositedFundsEvent } from '@account/domain/events';
import { EventStoreService } from '@core/infrastructure/eventstore/eventstore.service';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(DepositedFundsEvent)
export class DepositedFundsHandler
  implements IEventHandler<DepositedFundsEvent>
{
  constructor(
    private readonly despositFundsUseCase: DespositFundsUseCase,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async handle(event: DepositedFundsEvent) {
    const { account } = event;
    await this.despositFundsUseCase.execute(account);
    await this.eventStoreService.emit(
      'Transaction',
      DepositedFundsEvent.name,
      account,
    );
  }
}
