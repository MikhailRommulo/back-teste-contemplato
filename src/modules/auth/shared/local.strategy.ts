import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/modules/users/domain/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    });
  }

  async validate(userName: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
