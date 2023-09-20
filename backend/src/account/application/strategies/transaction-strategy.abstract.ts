import { Account } from '@account/domain/aggregates/account.aggregate';
import { TransactionDto } from '../dtos';

export abstract class TransacionStrategy {
  public abstract execute(data: TransactionDto): Promise<Account>;
}
