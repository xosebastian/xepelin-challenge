import { Module } from '@nestjs/common';
import { CreateAccountUseCase } from './use-cases';
import { AccountRepositoryImplement } from '../infrastructure/repositories';
import { ACCOUNT_REPOSITORY } from './injection-tokens';

@Module({
  providers: [
    CreateAccountUseCase,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountRepositoryImplement,
    },
  ],
})
export class AccountModule {}
