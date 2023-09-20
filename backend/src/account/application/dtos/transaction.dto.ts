import { TransactionType } from '@account/domain/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class TransactionDto {
  @IsUUID()
  @IsNotEmpty()
  readonly accountId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  readonly type: TransactionType;
}
