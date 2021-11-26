import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from 'src/infrastructure/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { UsersUseCases } from '../users/users.usecase';
import { StorageService } from 'src/infrastructure/storage/storage.service';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly jwtService: JwtService,
    private readonly usersUseCase: UsersUseCases,
    private readonly storageService: StorageService,
  ) {}

  async validateUserByPassword(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    // TODO : Add hash password , this is for simple
    console.log(email);
    const user = await this.userRepository.findByEmail(email);
    console.log('User = ', user);
    if (user && user.password == password) {
      return await this.signJwt(user);
    }
    return null;
  }

  async signJwt(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterUserDto): Promise<User> {
    const randomString = dto.displayName + String(Date.now());
    const avatarUrlBlob = await this.storageService.uploadAvatar(
      dto.avatar,
      randomString,
    );
    const newUser = { ...dto, roleID: 1, avatarUrl: avatarUrlBlob };
    return await this.usersUseCase.create(newUser);
  }
}
