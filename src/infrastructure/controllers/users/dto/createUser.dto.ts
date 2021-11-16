import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsIn,
  IsString,
  IsDate,
  IsFQDN,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsAlpha,
  IsEmpty,
  IsDateString,
  Validate,
} from 'class-validator';
import { IsUserEmailAlreadyExist } from 'src/infrastructure/validators/user/user.validator';
export class CreateUserDto {
  // @IsEmail()
  @Validate(IsUserEmailAlreadyExist, {
    message: 'Email already exists',
  })
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
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
  @ApiProperty()
  gender: 'Male' | 'Female';

  @IsInt()
  @ApiProperty()
  roleID: number;
}
