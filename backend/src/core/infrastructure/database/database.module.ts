import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DbConfig } from '../config/schemas';
import { Account } from '@account/domain/entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig: DbConfig =
          configService.get<DbConfig>('config.dbConfig');

        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          synchronize: true,
          migrationsRun: true,
          entities: [Account],
          migrations: [__dirname + '/../../**/migrations/*.{ts,js}'],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
