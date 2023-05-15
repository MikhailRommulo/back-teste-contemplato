import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/domain/user.entity';
import { TYPES } from '../../users/interfaces/types';
import { GetUserService } from '../../users/interfaces/services/get.user.service.interface';
import { AuthService } from '../shared/auth.service';

class JwtServiceMock {
  sign = jest.fn();
}

class GetUserServiceMock {
  getByEmail = jest.fn();

  getById = jest.fn();
}

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock: JwtService;
  let getUserMock: GetUserService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
        {
          provide: TYPES.services.GetUserService,
          useClass: GetUserServiceMock,
        },
      ],
    }).compile();

    service = app.get<AuthService>(AuthService);
    jwtServiceMock = app.get<JwtService>(JwtService);
    getUserMock = app.get<GetUserService>(TYPES.services.GetUserService);
  });

  describe('login', () => {
    it('should login and return an access_token', async () => {
      jwtServiceMock.sign = jest.fn().mockReturnValue('tokenHere');

      const token = await service.login({
        userName: 'elvex10',
        userId: '123',
      });
      expect(token).toEqual({
        access_token: 'tokenHere',
      });
      expect(jwtServiceMock.sign).toHaveBeenCalledWith({
        userName: 'elvex10',
        id: '123',
      });
    });
  });

  xdescribe('validateUser', () => {
    it('should return user if founded and passord matches', async () => {
      const user: User = {
        userId: '123123123',
        userName: 'elvex10',
        hashPassword:
          '$2a$10$uGfMXo/Mmbs5fdAdLqJr7.G3XUMV/pzQL2npV0xn3UYS4LSll3ElG',
      };
      jest.spyOn(getUserMock, 'getByUserName').mockResolvedValueOnce(user);
      jwtServiceMock.sign = jest.fn().mockReturnValue('tokenHere');

      const validatedUser = await service.validateUser('elvex10', '123456');
      expect(validatedUser).toEqual(user);
    });
    it('should return null if password does not match', async () => {
      const user: User = {
        userId: '123123123',
        userName: 'elvex10',
        hashPassword:
          '$2a$10$HUWM5RrhkPtm42s1tM5wKeESDyZg0soqAbdcuHOyJaLzh6A2yNU2e',
      };
      jest.spyOn(getUserMock, 'getByUserName').mockResolvedValueOnce(user);
      jwtServiceMock.sign = jest.fn().mockReturnValue('tokenHere');

      const validatedUser = await service.validateUser('elvex10', '123458');
      expect(validatedUser).toBeNull();
    });
  });
});
