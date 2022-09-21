import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';

// create user dto
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsDateString('YYYY-MM-DD')
  birthday: string;

  @IsEmail()
  email: string;

  @IsString()
  inviteID: string;
}

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsDateString('YYYY-MM-DD')
  birthday: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
