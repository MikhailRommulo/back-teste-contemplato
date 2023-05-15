import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getORMConfig } from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot(getORMConfig()),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
