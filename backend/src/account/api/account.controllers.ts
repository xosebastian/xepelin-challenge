//Create controller

import { Controller, Post } from '@nestjs/common';

// Path: backend/src/account/api/account.controllers.ts

// Path: backend/src/account/api/account.controllers.ts

@Controller({ path: 'accounts' })
export class AccountController {
  constructor() {}

  @Post('')
  async createAccount() {
    return;
  }
}
