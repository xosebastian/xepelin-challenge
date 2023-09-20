import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly accountNumber: string;

  @IsPositive()
  @IsNotEmpty()
  readonly balance: number;
}
