import { DepositFundsCommand } from '../implement';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { EventPublisher } from '@nestjs/cqrs';
import { AccountRepository } from '@account/domain/repositories';
import { v4 as uuidv4 } from 'uuid';
import { DepositFundsHandler } from '../handlers';
import { AccountNotFoundException } from '@account/application/exceptions';

describe('DepositFundsHandler', () => {
  let handler: DepositFundsHandler;
  let mockPublisher: jest.Mocked<EventPublisher>;
  let mockAccountRepository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    mockPublisher = {
      mergeObjectContext: jest.fn(),
    } as any;

    mockAccountRepository = {
      findById: jest.fn(),
    } as any;

    handler = new DepositFundsHandler(mockPublisher, mockAccountRepository);
  });

  it('should deposit successfully', async () => {
    const mockAccountId = uuidv4();
    const command = new DepositFundsCommand(mockAccountId, 100);
    const mockAccount = new Account(mockAccountId, 'John', '12345');

    mockAccountRepository.findById.mockResolvedValue(mockAccount);
    mockPublisher.mergeObjectContext.mockReturnValue(mockAccount);

    await handler.execute(command);
  });

  it('should throw an error if the account does not exist', async () => {
    const mockAccountId = uuidv4();
    const command = new DepositFundsCommand(mockAccountId, 100);

    mockAccountRepository.findById.mockResolvedValue(null);

    await expect(handler.execute(command)).rejects.toThrow(
      AccountNotFoundException,
    );
  });
});
