import { AccountModule } from '@account/application/account.module';
import { CoreConfigModule } from '@core/infrastructure/config/core-config.module';
import { DbModule } from '@core/infrastructure/database/database.module';
import { EventStoreModule } from '@core/infrastructure/eventstore/eventstore.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreConfigModule, AccountModule, DbModule, EventStoreModule],
})
export class ApplicationModule {}
