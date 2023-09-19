import { Module } from '@nestjs/common';
import {
  AccountController,
  TransacionController,
} from '@account/interfaces/api';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAccountHandler } from '@account/commands/handlers';
import { CreateAccountUseCase, GetAccountBalanceUseCase } from './use-cases';
import { ACCOUNT_REPOSITORY } from './injection-tokens';
import { AccountRepositoryImplement } from '@account/infrastructure/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@account/domain/entities';
import { CreatedAccountHandler } from '@account/interfaces/listeners';
import { EventStoreModule } from '@core/infrastructure/eventstore/eventstore.module';
import { GetAccountBalanceHandler } from '@account/queries/handlers';
import {
  DepositStrategy,
  TransactionContext,
  WithdrawStrategy,
} from './strategies';
import { AccountFactory } from '@account/domain/factory';

const commandHandlers = [CreateAccountHandler];
const eventHandlers = [CreatedAccountHandler, GetAccountBalanceHandler];
const application = [
  CreateAccountUseCase,
  GetAccountBalanceUseCase,
  WithdrawStrategy,
  DepositStrategy,
  TransactionContext,
];
const infrastructure = [
  {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepositoryImplement,
  },
];
const interfaces = [AccountController, TransacionController];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Account]), EventStoreModule],
  controllers: [...interfaces],
  providers: [
    ...infrastructure,
    ...commandHandlers,
    ...application,
    ...eventHandlers,
    AccountFactory,
  ],
})
export class AccountModule {}
