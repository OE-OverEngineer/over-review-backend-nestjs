import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from 'src/infrastructure/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { UsersUseCases } from '../users/users.usecase';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { JwtData } from 'src/infrastructure/auth/jwt.interface';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly jwtService: JwtService,
    private readonly usersUseCase: UsersUseCases,
  ) {}

  // Login with email and password then get jwt
  async validateUserByPassword(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.password == password && user.banned !== true) {
      return await this.signJwt(user);
    }
    return null;
  }

  // encode user data to jwt format
  async signJwt(user: User) {
    const payload: JwtData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.title,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role.title,
    };
  }

  // user register to member then get jet
  async register(dto: RegisterUserDto): Promise<User> {
    const newUser = { ...dto, roleId: 1 };
    return await this.usersUseCase.create(newUser);
  }
}
