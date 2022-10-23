import { Module } from '@nestjs/common';
import { UserInfosController } from './user_infos.controller';
import { UserInfosService } from './user_infos.service';

@Module({
  controllers: [UserInfosController],
  providers: [UserInfosService],
})
export class UserInfosModule {}
