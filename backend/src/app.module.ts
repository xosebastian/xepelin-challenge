import { AccountModule } from '@account/application/account.module';
import { CoreConfigModule } from '@core/infrastructure/config/core-config.module';
import { DbModule } from '@core/infrastructure/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreConfigModule, AccountModule, DbModule],
})
export class ApplicationModule {}
