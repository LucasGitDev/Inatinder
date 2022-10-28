import { Module } from '@nestjs/common';
import JWTProvider from 'src/providers/jwtProvider';
import { UserLikesController } from './user_likes.controller';
import { UserLikesService } from './user_likes.service';

@Module({
  controllers: [UserLikesController],
  providers: [UserLikesService, JWTProvider],
})
export class UserLikesModule {}
