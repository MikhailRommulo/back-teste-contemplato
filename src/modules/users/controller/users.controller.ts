import {
  Controller,
  Inject,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { CreateUserApplication } from '../interfaces/applications/create.user.application.interface';
import { User } from '../domain/user.entity';
import { GetUserApplication } from '../interfaces/applications/get.user.application.interface';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    @Inject(TYPES.applications.CreateUserApplication)
    private createUserApp: CreateUserApplication,
    @Inject(TYPES.applications.GetUserApplication)
    private getUserApp: GetUserApplication,
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

  @ApiOkResponse({
    description: 'Get user by id',
    type: UserDomain,
  })
  @ApiNotFoundResponse({
    description: 'User was not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<User | undefined> {
    const user = await this.getUserApp.getById(id);
    return user;
  }
}
