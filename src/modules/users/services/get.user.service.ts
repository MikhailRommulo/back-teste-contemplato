import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { GetUserService } from '../interfaces/services/get.user.service.interface';

@Injectable()
export class GetUserServiceImpl implements GetUserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userId: id } });
  }

  async getByUserName(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userName } });
  }
}
