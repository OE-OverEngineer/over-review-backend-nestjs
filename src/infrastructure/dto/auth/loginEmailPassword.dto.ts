import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginEmailPasswordDto {
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'password',
  })
  @IsNotEmpty()
  password: string;
}
