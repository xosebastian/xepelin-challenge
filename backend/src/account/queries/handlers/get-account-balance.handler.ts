import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountBalanceQuery } from '../implement';
import { GetAccountBalanceUseCase } from '@account/application/use-cases';

@QueryHandler(GetAccountBalanceQuery)
export class GetAccountBalanceHandler
  implements IQueryHandler<GetAccountBalanceQuery>
{
  constructor(
    private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase,
  ) {}

  async execute(query: GetAccountBalanceQuery): Promise<number> {
    const { accountId } = query;
    const balance = await this.getAccountBalanceUseCase.execute(accountId);
    return balance;
  }
}
