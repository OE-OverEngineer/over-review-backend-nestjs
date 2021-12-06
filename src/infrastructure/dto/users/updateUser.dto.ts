import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsAlpha,
  IsDateString,
  IsIn,
  IsInt,
} from 'class-validator';
import { IsRoleFound } from 'src/infrastructure/validators/roles/role.validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @ApiProperty({ default: 'password' })
  @MinLength(6, {
    message: 'Password must be longer than 6 characters',
  })
  @MaxLength(50, {
    message: 'Password must be less than 50 characters',
  })
  password?: string;

  @IsNotEmpty()
  @IsAlpha()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @ApiProperty()
  firstName?: string;

  @IsNotEmpty()
  @IsAlpha()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @ApiProperty()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @ApiProperty()
  @MinLength(4, {
    message: 'Display name must be longer than 4 characters',
  })
  displayName?: string;

  // @ApiProperty()
  // avatarUrl: string;
  @ApiProperty()
  @IsString()
  avatar?: string;

  avatarUrl?: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth?: Date;

  @IsIn(['Male', 'Female'])
  @ApiProperty({ default: 'Male' })
  gender?: 'Male' | 'Female';

  @IsInt()
  @IsRoleFound()
  @ApiProperty()
  roleId?: number;

  @ApiProperty({ default: false })
  banned?: boolean;
}
