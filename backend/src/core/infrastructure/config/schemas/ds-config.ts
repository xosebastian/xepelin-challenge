import { IsOptional, IsString } from 'class-validator';

export class DsConfig {
  @IsString()
  host: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  database: string;
}
