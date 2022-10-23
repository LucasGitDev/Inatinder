import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfosModule } from './user_infos/user_infos.module';

@Module({
  imports: [UserInfosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
