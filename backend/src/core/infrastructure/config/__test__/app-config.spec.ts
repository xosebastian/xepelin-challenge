import { plainToInstance } from 'class-transformer';
import { AppConfig } from '../schemas/app-config';
import 'reflect-metadata';
import { validate } from 'class-validator';
describe('AppConfig', () => {
  describe('appName', () => {
    it('should not have errors', async () => {
      const appConfig = plainToInstance(AppConfig, {
        appName: 'my-app',
        environment: 'test',
        dbConfig: {
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: process.env.DB_PASSWORD,
          database: 'my-db',
        },
      });
      const errors = await validate(appConfig);
      expect(errors.length).toBe(0);
      expect(appConfig.appName).toEqual('my-app');
    });
  });
});
