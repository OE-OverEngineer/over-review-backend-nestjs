import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infrastructure/auth/local-auth.guard';
import { LoginEmailPasswordDto } from 'src/infrastructure/dto/auth/loginEmailPassword.dto';
import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { AuthUseCase } from 'src/usecases/auth/auth.usecase';

@ApiTags('Auths')
@Controller('auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'Login success return access_token (JWT)',
  })
  @ApiUnauthorizedResponse()
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginEmailPasswordDto,
  ): Promise<{ access_token: string }> {
    return await this.authUseCase.validateUserByPassword(
      dto.email,
      dto.password,
    );
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Create user success',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async register(
    @Body() dto: RegisterUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.authUseCase.register(dto);
    return await this.authUseCase.signJwt(user);
  }
}
