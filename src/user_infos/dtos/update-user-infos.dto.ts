import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInfosDto } from './create-user-infos.dto';

export class UpdateUserInfosDto extends PartialType(CreateUserInfosDto) {}
