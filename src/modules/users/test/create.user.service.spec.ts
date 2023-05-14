import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserServiceImpl } from '../services/create.user.service';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';

describe('CreateUserService', () => {
  let service: CreateUserServiceImpl;
  let repositoryMock: Repository<User>;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        CreateUserServiceImpl,
        {
          provide: getRepositoryToken(User),

          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<CreateUserServiceImpl>(CreateUserServiceImpl);
    repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create user', async () => {
      const user: User = {
        userId: '123123123',
        userName: 'elvex10',
        hashPassword:
          '$2a$10$HUWM5RrhkPtm42s1tM5wKeESDyZg0soqAbdcuHOyJaLzh6A2yNU2e',
      };

      const sendUser: UserDomain = {
        password: '123456',
        userName: 'elvex10',
      };

      jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(user);
      expect(await service.create(sendUser)).toEqual(user);
      expect(repositoryMock.save).toBeCalled();
    });
  });
});
