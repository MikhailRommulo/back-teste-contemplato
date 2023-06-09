import { Injectable, Inject } from '@nestjs/common';
import { UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { CreateUserService } from '../interfaces/services/create.user.service.interface';
import { CreateUserApplication } from '../interfaces/applications/create.user.application.interface';
import { User } from '../domain/user.entity';

@Injectable()
export class CreateUserApplicationImpl implements CreateUserApplication {
  constructor(
    @Inject(TYPES.services.CreateUserService)
    private userService: CreateUserService,
  ) {}

  async create(user: UserDomain): Promise<User> {
    return this.userService.create(user);
  }
}
