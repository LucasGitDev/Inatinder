import { Module } from '@nestjs/common';
import BCryptHashProvider from 'src/providers/hashProvider';
import JWTProvider from 'src/providers/jwtProvider';
import { UserInfosController } from './user_infos.controller';
import { UserInfosService } from './user_infos.service';

@Module({
  controllers: [UserInfosController],
  providers: [UserInfosService, BCryptHashProvider, JWTProvider],
})
export class UserInfosModule {}
