import { Module } from '@nestjs/common';
import { AccountController } from '@account/interfaces';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAccountHandler } from '@account/commands/handlers';
import { CreateAccountUseCase } from './use-cases';
import { ACCOUNT_REPOSITORY } from './injection-tokens';
import { AccountRepositoryImplement } from '@account/infrastructure/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@account/domain/entities';

const CommandHandlers = [CreateAccountHandler];
const Application = [CreateAccountUseCase];
const Infrastructure = [
  {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepositoryImplement,
  },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [...Infrastructure, ...CommandHandlers, ...Application],
})
export class AccountModule {}
