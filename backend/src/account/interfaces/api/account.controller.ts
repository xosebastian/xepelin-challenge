import { CreateAccountDto } from '@account/application/dtos';
import { CreateAccountCommand } from '@account/commands/implement';
import { GetAccountBalanceQuery } from '@account/queries/implement';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller({ path: 'accounts' })
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createAccount(@Body() payload: CreateAccountDto) {
    const command = new CreateAccountCommand(
      payload.name,
      payload.accountNumber,
    );
    const accountId = await this.commandBus.execute(command);
    return { accountId };
  }

  @Get('/:id/balance')
  async getBalance(@Param('id', ParseUUIDPipe, ValidationPipe) id: string) {
    const query = new GetAccountBalanceQuery(id);
    const balance: number = await this.queryBus.execute(query);
    return { balance };
  }
}
