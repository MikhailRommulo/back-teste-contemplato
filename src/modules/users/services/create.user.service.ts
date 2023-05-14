import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';
import { CreateUserService } from '../interfaces/services/create.user.service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserServiceImpl implements CreateUserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create({ password, userName }: UserDomain): Promise<User> {
    const user: User = new User();
    user.hashPassword = await bcrypt.hash(password, 10);
    user.userName = userName;
    return this.usersRepository.save(user);
  }
}
