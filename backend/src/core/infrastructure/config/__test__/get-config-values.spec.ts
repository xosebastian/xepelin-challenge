import { getConfigValues } from '../get-config-values';

describe('getConfigValues', () => {
  beforeEach(() => {
    process.env = {
      ENVIRONMENT: 'test',
      PROJECT_NAME: 'my-app',
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_USER: 'postgres',
      DB_PASSWORD: 'password',
      DB_NAME: 'my-db',
    };
  });

  it('should return the correct environment value', async () => {
    const configValues = await getConfigValues();
    expect(configValues.environment).toBe('test');
  });

  it('should return the correct app name value', async () => {
    const configValues = await getConfigValues();
    expect(configValues.appName).toBe('my-app');
  });

  it('should return the correct database configuration values', async () => {
    const configValues = await getConfigValues();
    expect(configValues.dbConfig.host).toBe('localhost');
    expect(configValues.dbConfig.port).toBe(5432);
    expect(configValues.dbConfig.username).toBe('postgres');
    expect(configValues.dbConfig.password).toBe('password');
    expect(configValues.dbConfig.database).toBe('my-db');
  });
});
