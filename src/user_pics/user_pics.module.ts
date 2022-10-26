import { Module } from '@nestjs/common';
import { Database } from 'src/database/controller/database';
import JWTProvider from 'src/providers/jwtProvider';
import { UserPicsController } from './user_pics.controller';
import { UserPicsService } from './user_pics.service';

@Module({
  controllers: [UserPicsController],
  providers: [UserPicsService, Database, JWTProvider],
})
export class UserPicsModule {}
