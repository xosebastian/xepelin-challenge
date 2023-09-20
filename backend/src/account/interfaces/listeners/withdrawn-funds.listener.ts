import { WithdrawFundsUseCase } from '@account/application/use-cases';
import { WithdrawnFundsEvent } from '@account/domain/events';
import { EventStoreService } from '@core/infrastructure/eventstore/eventstore.service';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WithdrawnFundsEvent)
export class WithdrawnFundsHandler
  implements IEventHandler<WithdrawnFundsEvent>
{
  constructor(
    private readonly withdrawFundsUseCase: WithdrawFundsUseCase,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async handle(event: WithdrawnFundsEvent) {
    const { account } = event;
    await this.withdrawFundsUseCase.execute(account);
    await this.eventStoreService.emit(
      'Transaction',
      WithdrawnFundsEvent.name,
      account,
    );
  }
}
