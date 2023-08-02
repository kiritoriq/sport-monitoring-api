import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { UserModule } from '../user.module';
import { DatabaseModule } from 'src/database.module';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EmailAlreadyTakenException } from '../exceptions/email-already-taken.exception';
import { PhoneNumberAlreadyTakenException } from '../exceptions/phone-number-already-taken.exception';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findBy: jest.fn((entity) => entity),
    // ...
  }),
);

describe(RegisterService, () => {
  let registerService: RegisterService;
  let userService: UserService;
  let userRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    registerService = testingModule.get<RegisterService>(RegisterService);
    userService = testingModule.get<UserService>(UserService);
    userRepository = testingModule.get(getRepositoryToken(User));
  });

  describe('register', () => {
    const createUserDto = ({
      email = 'admin@admin.com',
      username = 'admin',
      name = 'Administrator',
      phone = '082991029',
      password = 'password',
      address = 'Testing Address',
    }): CreateUserDto => {
      return {
        email: email,
        username: username,
        name: name,
        phone: phone,
        password: password,
        address: address,
      };
    };

    it('should throw EmailAlreadyTakenException when registering user with an existing email', async () => {
      const existingEmail = 'already-used@mail.com';

      jest
        .spyOn(userService, 'find')
        .mockResolvedValueOnce([{ email: existingEmail }] as any);

      await expect(
        registerService.register(createUserDto({ email: existingEmail })),
      ).rejects.toThrow(EmailAlreadyTakenException);
    });

    it('should throw PhoneNumberAlreadyTakenException when registering user with an existing phone number', async () => {
      const existingPhone = '082999123';

      jest
        .spyOn(userService, 'find')
        .mockResolvedValue([{ phone: existingPhone }] as any);

      await expect(
        registerService.register(createUserDto({ phone: existingPhone })),
      ).rejects.toThrow(PhoneNumberAlreadyTakenException);
    });

    it('should register a user when email and phone number are not taken', async () => {
      const newUser = {
        email: 'new@example.com',
        name: 'Test User',
        username: 'test_user',
        password: 'secure_password',
        phone: '9876543210',
        address: '789 Third St',
      };

      jest.spyOn(userService, 'find').mockResolvedValueOnce([] as any);

      jest.spyOn(userService, 'store').mockResolvedValueOnce(newUser as any);

      const result = await registerService.register(newUser as any);

      expect(result).toEqual(newUser);
    });
  });
});
