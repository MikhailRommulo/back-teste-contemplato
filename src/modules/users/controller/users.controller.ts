import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { CreateUserApplication } from '../interfaces/applications/create.user.application.interface';
import { User } from '../domain/user.entity';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    @Inject(TYPES.applications.CreateUserApplication)
    private createUserApp: CreateUserApplication,
  ) {}

  @ApiCreatedResponse({
    description: 'It creates a new user',
    type: UserDomain,
  })
  @Post()
  async create(@Body() userDomain: UserDomain): Promise<User> {
    const user = await this.createUserApp.create(userDomain);
    return user;
  }
}
