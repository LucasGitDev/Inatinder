import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import BCryptHashProvider from 'src/providers/hashProvider';
import JWTProvider from 'src/providers/jwtProvider';

@Module({
  providers: [UsersService, BCryptHashProvider, JWTProvider],
  controllers: [UsersController],
})
export class UsersModule {}
