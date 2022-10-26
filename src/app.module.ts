import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfosModule } from './user_infos/user_infos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserInfosModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
