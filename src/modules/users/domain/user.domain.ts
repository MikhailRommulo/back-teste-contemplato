import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDomain {
  @IsString()
  @ApiProperty()
  readonly userName: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
