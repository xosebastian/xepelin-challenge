import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogDepositsMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LogDepositsMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.method === 'POST' &&
      req.path === '/transactions' &&
      req.body.amount > 10000 &&
      req.body.type === 'DEPOSIT'
    ) {
      this.logger.log(`Deposit over 10000 detected: ${req.body.amount}`);
    }
    next();
  }
}
