//Create controller

import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAccountDto } from '../application/dtos';
import { CreateAccountCommand } from '../commands/implement';

@Controller({ path: 'accounts' })
export class AccountController {
  constructor(readonly commandBus: CommandBus) {}

  @Post()
  async createAccount(@Body() payload: CreateAccountDto) {
    const command = new CreateAccountCommand(
      payload.name,
      payload.accountNumber,
    );

    return this.commandBus.execute(command);
  }
}
