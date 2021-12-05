import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginEmailPasswordDto {
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value.trim())
  email: string;

  @ApiProperty({
    default: 'password',
  })
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  password: string;
}
