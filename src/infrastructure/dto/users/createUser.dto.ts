import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsIn,
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsAlpha,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { IsRoleFound } from 'src/infrastructure/validators/roles/role.validator';

import { IsEmailAlreadyExist } from 'src/infrastructure/validators/users/user.validator';

export class CreateUserDto {
  @IsEmail()
  @IsEmailAlreadyExist()
  @ApiProperty({ default: 'test@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ default: 'password' })
  @MinLength(6, {
    message: 'Password must be longer than 6 characters',
  })
  @MaxLength(50, {
    message: 'Password must be less than 50 characters',
  })
  password: string;

  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(4, {
    message: 'Display name must be longer than 4 characters',
  })
  displayName: string;

  // @ApiProperty()
  // avatarUrl: string;
  @ApiProperty()
  @IsString()
  avatarUrl?: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: Date;

  @IsIn(['Male', 'Female'])
  @ApiProperty({ default: 'Male' })
  gender: 'Male' | 'Female';

  @IsInt()
  @IsRoleFound()
  @ApiProperty()
  roleID: number;
}
