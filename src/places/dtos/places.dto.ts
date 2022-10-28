import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlacesDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(45)
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class UpdatePlacesDto extends PartialType(CreatePlacesDto) {}
