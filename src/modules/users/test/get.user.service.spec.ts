import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetUserService } from 'src/modules/users/interfaces/services/get.user.service.interface';
import { User } from '../domain/user.entity';
import { GetUserServiceImpl } from '../services/get.user.service';

describe('GetUserService', () => {
  let service: GetUserService;
  let repositoryMock: Repository<User>;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        GetUserServiceImpl,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<GetUserService>(GetUserServiceImpl);
    repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const user: User = {
        userId: '123123123',
        userName: 'elvex10',
        hashPassword:
          '$2a$10$HUWM5RrhkPtm42s1tM5wKeESDyZg0soqAbdcuHOyJaLzh6A2yNU2e',
      };
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);
      expect(await service.getById(user.userId)).toEqual(user);
      expect(repositoryMock.findOne).toBeCalled();
    });
  });

  describe('getByUserName', () => {
    it('should find user by id', async () => {
      const user: User = {
        userId: '123123123',
        userName: 'elvex10',
        hashPassword:
          '$2a$10$HUWM5RrhkPtm42s1tM5wKeESDyZg0soqAbdcuHOyJaLzh6A2yNU2e',
      };
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);
      expect(await service.getByUserName(user.userName)).toEqual(user);
      expect(repositoryMock.findOne).toBeCalledWith({
        where: { userName: user.userName },
      });
    });
  });
});
