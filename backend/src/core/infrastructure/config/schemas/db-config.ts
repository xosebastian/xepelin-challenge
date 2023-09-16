import { IsOptional, IsPositive, IsString } from 'class-validator';

export class DbConfig {
  @IsString()
  host: string;

  @IsPositive()
  @IsOptional()
  port: number;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  database: string;
}
