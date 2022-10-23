import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInfosDto {
  @IsString()
  @IsNotEmpty()
  course: string;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsString()
  @IsNotEmpty()
  hometown: string;

  @IsString()
  @IsNotEmpty()
  biography: string;
}
