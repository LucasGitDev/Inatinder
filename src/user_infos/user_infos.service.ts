import { Injectable } from '@nestjs/common';
import { CreateUserInfosDto } from './dtos/create-user-infos.dto';
import { UpdateUserInfosDto } from './dtos/update-user-infos.dto';
import { UserInfos } from './entities/user_infos.entity';

@Injectable()
export class UserInfosService {
  async create(createUserInfosDto: CreateUserInfosDto) {
    return UserInfos.create(createUserInfosDto);
  }

  async findAll() {
    return await UserInfos.findAll();
  }

  async findOne(id: number) {
    return await UserInfos.findById(id);
  }

  async update(id: number, updateUserInfosDto: UpdateUserInfosDto) {
    return await UserInfos.update(id, updateUserInfosDto);
  }

  async remove(id: number) {
    return await UserInfos.delete(id);
  }
}
