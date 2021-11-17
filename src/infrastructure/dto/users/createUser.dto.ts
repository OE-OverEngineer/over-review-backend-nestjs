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
} from 'class-validator';
import { IsRoleAlreadyExist } from 'src/infrastructure/validators/roles/role.validator';
import { IsUserEmailAlreadyExist } from 'src/infrastructure/validators/users/user.validator';
export class CreateUserDto {
  @IsEmail()
  @IsUserEmailAlreadyExist()
  @ApiProperty({ default: 'test@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ default: 'password' })
  @MinLength(6, {
    message: 'Password must be longer than 6 characters',
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

  @IsString()
  @ApiProperty()
  avatar: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: Date;

  @IsIn(['Male', 'Female'])
  @ApiProperty({ default: 'Male' })
  gender: 'Male' | 'Female';

  @IsInt()
  @IsRoleAlreadyExist()
  @ApiProperty()
  roleID: number;
}
