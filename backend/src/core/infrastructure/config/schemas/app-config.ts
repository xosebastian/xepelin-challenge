import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { DbConfig } from './db-config';
import { DsConfig } from './ds-config';

export class AppConfig {
  @IsNotEmpty()
  @IsString()
  appName: string;

  @IsNotEmpty()
  @IsString()
  environment: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DbConfig)
  dbConfig: DbConfig;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DsConfig)
  dsConfig: DsConfig;
}
