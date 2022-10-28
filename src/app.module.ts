import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfosModule } from './user_infos/user_infos.module';
import { UsersModule } from './users/users.module';
import { UserPicsModule } from './user_pics/user_pics.module';
import { UserLikesModule } from './user_likes/user_likes.module';
import { PlacesService } from './places/places.service';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [UserInfosModule, UsersModule, UserPicsModule, UserLikesModule, PlacesModule],
  controllers: [AppController],
  providers: [AppService, PlacesService],
})
export class AppModule {}
