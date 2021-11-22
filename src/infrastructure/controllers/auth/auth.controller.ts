import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infrastructure/auth/local-auth.guard';
import { LoginEmailPasswordDto } from 'src/infrastructure/dto/auth/loginEmailPassword.dto';
import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { AuthUseCase } from 'src/usecases/auth/auth.usecase';

@ApiTags('Auths')
@Controller('auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() dto: LoginEmailPasswordDto,
  ): Promise<{ access_token: string }> {
    return await this.authUseCase.validateUserByPassword(
      dto.email,
      dto.password,
    );
  }

  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.authUseCase.register(dto);
    return await this.authUseCase.signJwt(user);
  }
}
