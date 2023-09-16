import { ConfigModule, registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { getConfigValues } from './get-config-values';
import { AppConfig } from './schemas';

const config = registerAs('config', async (): Promise<AppConfig> => {
  const values = await getConfigValues();

  const validatedConfig = plainToInstance(AppConfig, values, {
    enableImplicitConversion: true,
    exposeUnsetFields: false,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
});

export default config;

export const loadConfig = config;

export const CoreConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [loadConfig],
});
