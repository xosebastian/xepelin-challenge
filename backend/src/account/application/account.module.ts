import { Module } from '@nestjs/common';
import {
  AccountController,
  TransacionController,
} from '@account/interfaces/api';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateAccountHandler,
  DepositFundsHandler,
  WithdrawFundsHandler,
} from '@account/commands/handlers';
import {
  CreateAccountUseCase,
  DespositFundsUseCase,
  GetAccountBalanceUseCase,
  WithdrawFundsUseCase,
} from './use-cases';
import { ACCOUNT_REPOSITORY } from './injection-tokens';
import { AccountRepositoryImplement } from '@account/infrastructure/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@account/domain/entities';
import {
  CreatedAccountHandler,
  DepositedFundsHandler,
  WithdrawnFundsHandler,
} from '@account/interfaces/listeners';
import { EventStoreModule } from '@core/infrastructure/eventstore/eventstore.module';
import { GetAccountBalanceHandler } from '@account/queries/handlers';
import {
  DepositStrategy,
  TransactionContext,
  WithdrawStrategy,
} from './strategies';
import { AccountFactory } from '@account/domain/factory';

const commandHandlers = [
  CreateAccountHandler,
  DepositFundsHandler,
  WithdrawFundsHandler,
];
const eventHandlers = [
  CreatedAccountHandler,
  GetAccountBalanceHandler,
  DepositedFundsHandler,
  WithdrawnFundsHandler,
];
const application = [
  CreateAccountUseCase,
  DespositFundsUseCase,
  WithdrawFundsUseCase,
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

const factories = [AccountFactory];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Account]), EventStoreModule],
  controllers: [...interfaces],
  providers: [
    ...infrastructure,
    ...commandHandlers,
    ...application,
    ...eventHandlers,
    ...factories,
  ],
})
export class AccountModule {}
