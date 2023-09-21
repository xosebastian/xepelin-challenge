import { TransactionDto } from '../dtos';

export abstract class TransacionStrategy {
  public abstract execute(data: TransactionDto): Promise<void>;
}
