import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockUser = {
  id: 1,
  username: 'testuser',
  password: 'passwordhash',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockBcryptCompareTrue = jest.fn().mockResolvedValue(true);
  const mockBcryptCompareFalse = jest.fn().mockResolvedValue(false);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: { findOne: jest.fn() }},
        { provide: JwtService, useValue: { signAsync: jest.fn() }}
      ],
    })
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('createToken', () => {
    it('should return string of access token', async () => {
      const result = 'dummy-access-token';

      jest.spyOn(jwtService, 'signAsync')
        .mockResolvedValue(result);

      expect(await authService.createToken(mockUser.id)).toBe(result);
    });
  });

  describe('login', () => {
    it('should throw BadRequestException because the user is not exists', async () => {
      const credential: LoginDto = {
        username: mockUser.username,
        password: mockUser.password
      };

      jest.spyOn(userService, 'findOne')
        .mockResolvedValue(undefined);

      await expect(authService.login({
        username: mockUser.username,
        password: mockUser.password
      } as LoginDto)).rejects.toThrowError(BadRequestException);
    });

    it('should throw BadRequestException because password typed in not match with hashed password', async () => {
      jest.spyOn(userService, 'findOne')
        .mockResolvedValue(mockUser as any);

      jest.spyOn(bcrypt, 'compare').mockImplementation(mockBcryptCompareFalse);

      await expect(authService.login({
        username: mockUser.username,
        password: mockUser.password
      } as LoginDto)).rejects.toThrow(BadRequestException);
    });

    it('should be successfully logged in and return LoginResponseDto', async () => {
      const credential = {
        username: mockUser.username,
        password: mockUser.password
      };

      jest.spyOn(userService, 'findOne')
        .mockResolvedValue(mockUser as any);

      jest.spyOn(bcrypt, 'compare').mockImplementation(mockBcryptCompareTrue);
      
      jest.spyOn(jwtService, 'signAsync')
        .mockResolvedValue('dummy-access-token');

      const result = await authService.login(credential);

      expect(result).toBeDefined();
      expect(result.accessToken).toEqual('dummy-access-token');
      expect(result.id).toEqual(mockUser.id);
    })
  })
});
