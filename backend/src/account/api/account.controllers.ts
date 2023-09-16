//Create controller

import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAccountDto } from '../application/dtos';
import { CreateAccountCommand } from '../commands/implement';

// Path: backend/src/account/api/account.controllers.ts

// Path: backend/src/account/api/account.controllers.ts

@Controller({ path: 'accounts' })
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createAccount(@Body() payload: CreateAccountDto) {
    const command = new CreateAccountCommand(
      payload.name,
      payload.accountNumber,
    );

    return this.commandBus.execute(command);
  }
}
