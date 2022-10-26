import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth';
import { CreateUserInfosDto } from './dtos/create-user-infos.dto';
import { UpdateUserInfosDto } from './dtos/update-user-infos.dto';
import { UserInfosService } from './user_infos.service';

@Controller('user-infos')
export class UserInfosController {
  constructor(private readonly userInfosService: UserInfosService) {}

  @UseGuards(AuthMiddleware)
  @Post()
  async create(@Body() createUserInfosDto: CreateUserInfosDto) {
    return this.userInfosService.create(createUserInfosDto);
  }

  @UseGuards(AuthMiddleware)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userInfosService.findOne(id);
  }

  @UseGuards(AuthMiddleware)
  @Get()
  async findAll() {
    return await this.userInfosService.findAll();
  }

  @UseGuards(AuthMiddleware)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserInfosDto: UpdateUserInfosDto,
  ) {
    return this.userInfosService.update(id, updateUserInfosDto);
  }

  @UseGuards(AuthMiddleware)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userInfosService.remove(id);
  }
}
