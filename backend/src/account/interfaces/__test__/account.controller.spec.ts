import { Test, TestingModule } from '@nestjs/testing';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountDto } from '@account/application/dtos';
import { AccountController } from '../api';

describe('AccountController', () => {
  let controller: AccountController;
  let mockCommandBus: jest.Mocked<CommandBus>;
  let mockQueryBus: jest.Mocked<QueryBus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    mockCommandBus = module.get<CommandBus>(
      CommandBus,
    ) as jest.Mocked<CommandBus>;
    mockQueryBus = module.get<QueryBus>(QueryBus) as jest.Mocked<QueryBus>;
  });

  describe('createAccount', () => {
    it('should create an account and return its ID', async () => {
      const mockDto: CreateAccountDto = {
        name: 'John',
        accountNumber: '12345',
      };
      mockCommandBus.execute.mockResolvedValue('mocked-uuid');

      const result = await controller.createAccount(mockDto);

      expect(mockCommandBus.execute).toHaveBeenCalledWith(expect.anything());
      expect(result).toEqual({ accountId: 'mocked-uuid' });
    });
  });

  describe('getBalance', () => {
    it('should get the balance for a given account ID', async () => {
      const mockId = 'mocked-uuid';
      mockQueryBus.execute.mockResolvedValue(100);

      const result = await controller.getBalance(mockId);

      expect(mockQueryBus.execute).toHaveBeenCalledWith(expect.anything());
      expect(result).toEqual({ balance: 100 });
    });
  });
});
