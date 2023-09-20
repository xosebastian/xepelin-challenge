import { CreateAccountCommand } from '../implement';
import { Account } from '@account/domain/aggregates/account.aggregate';
import { EventPublisher } from '@nestjs/cqrs';
import { AccountRepository } from '@account/domain/repositories';
import { AccountAlreadyExistsException } from '../exceptions';
import { v4 as uuidv4 } from 'uuid';
import { CreateAccountHandler } from '../handlers';

describe('CreateAccountHandler', () => {
  let handler: CreateAccountHandler;
  let mockPublisher: jest.Mocked<EventPublisher>;
  let mockAccountRepository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    mockPublisher = {
      mergeObjectContext: jest.fn(),
    } as any;

    mockAccountRepository = {
      findByAccountNumber: jest.fn(),
    } as any;

    handler = new CreateAccountHandler(mockPublisher, mockAccountRepository);
  });

  it('should successfully create an account', async () => {
    const command = new CreateAccountCommand('John', '12345');
    mockAccountRepository.findByAccountNumber.mockResolvedValue(null);
    const mockAccountId = uuidv4();

    const mockAccount = new Account(mockAccountId, 'John', '12345');
    mockPublisher.mergeObjectContext.mockReturnValue(mockAccount);

    const result = await handler.execute(command);

    expect(mockAccountRepository.findByAccountNumber).toHaveBeenCalledWith(
      '12345',
    );
    expect(result).toBe(mockAccountId);
  });

  it('should throw an error if the account already exists', async () => {
    const command = new CreateAccountCommand('John', '12345');
    const existingAccount = new Account('existing-uuid', 'John', '12345');
    mockAccountRepository.findByAccountNumber.mockResolvedValue(
      existingAccount,
    );

    await expect(handler.execute(command)).rejects.toThrow(
      AccountAlreadyExistsException,
    );
  });
});
