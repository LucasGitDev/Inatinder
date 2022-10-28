import { Module } from '@nestjs/common';
import JWTProvider from 'src/providers/jwtProvider';
import { UserPicsController } from './user_pics.controller';
import { UserPicsService } from './user_pics.service';

@Module({
  controllers: [UserPicsController],
  providers: [UserPicsService, JWTProvider],
})
export class UserPicsModule {}
