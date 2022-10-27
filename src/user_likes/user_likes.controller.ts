import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth';
import { UserLikesService } from './user_likes.service';

@Controller('user-likes')
export class UserLikesController {
  constructor(private readonly userLikesServices: UserLikesService) {}

  @UseGuards(AuthMiddleware)
  @Post(':id/like/:liked')
  async userLikes(@Param('id') id: string, @Param('liked') liked: string) {
    return this.userLikesServices.userLikes(id, liked);
  }

  @UseGuards(AuthMiddleware)
  @Get(':id')
  async getAllUserLikes(@Param('id') id: string) {
    return this.userLikesServices.getAllUserLikes(id);
  }
}
