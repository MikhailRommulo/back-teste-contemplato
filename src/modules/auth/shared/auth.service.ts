import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserService } from 'src/modules/users/interfaces/services/get.user.service.interface';
import { TYPES } from '../../users/interfaces/types';
import { User } from 'src/modules/users/domain/user.entity';
import * as bcrypt from 'bcrypt';
import { UserAuth } from './user.interface';
import { Token } from './token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TYPES.services.GetUserService)
    private getUserService: GetUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userName: string,
    userPassword: string,
  ): Promise<User | null> {
    const user = await this.getUserService.getByUserName(userName);
    const passwordTrue = await bcrypt.compare(userPassword, user.hashPassword);
    if (user && passwordTrue) {
      return user;
    }
    return null;
  }

  async login(user: UserAuth): Promise<Token> {
    const payload = { userName: user.userName, id: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
