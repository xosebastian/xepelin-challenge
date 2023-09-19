import { TransactionType } from '@account/domain/enums';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class TransactionDto {
  @IsUUID()
  @IsNotEmpty()
  readonly accountId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  readonly type: TransactionType;
}
