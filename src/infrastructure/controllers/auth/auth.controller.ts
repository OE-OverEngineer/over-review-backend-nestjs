import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthUseCase } from 'src/usecases/auth.usecase';
import { LocalAuthGuard } from '../../auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authUseCase.login(req.user);
  }
}
