import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserInfosDto } from './dtos/create-user-infos.dto';
import { UpdateUserInfosDto } from './dtos/update-user-infos.dto';
import { UserInfosService } from './user_infos.service';

@Controller('user-infos')
export class UserInfosController {
  constructor(private readonly userInfosService: UserInfosService) {}

  @Post()
  async create(@Body() createUserInfosDto: CreateUserInfosDto) {
    return this.userInfosService.create(createUserInfosDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userInfosService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.userInfosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserInfosDto: UpdateUserInfosDto,
  ) {
    return this.userInfosService.update(id, updateUserInfosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userInfosService.remove(id);
  }
}
