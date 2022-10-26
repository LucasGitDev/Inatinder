import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfosModule } from './user_infos/user_infos.module';
import { UsersModule } from './users/users.module';
import { UserPicsModule } from './user_pics/user_pics.module';

@Module({
  imports: [UserInfosModule, UsersModule, UserPicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
