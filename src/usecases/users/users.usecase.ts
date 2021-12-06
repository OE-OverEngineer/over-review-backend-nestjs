import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';
import { Service } from 'typedi';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';
import { StorageService } from 'src/infrastructure/storage/storage.service';

@Service('UsersUseCase')
@Injectable()
export class UsersUseCases {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly storageService: StorageService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const randomString = dto.displayName + String(Date.now());
    const avatarUrlBlob = await this.storageService.uploadAvatar(
      dto.avatar,
      randomString,
    );
    return await this.userRepository.create({
      ...dto,
      avatarUrl: avatarUrlBlob,
    });
  }

  async update(id: number, dto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(email);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findTopReviewers(amount: number): Promise<User[]> {
    return await this.userRepository.findTopReviewers(amount);
  }

  async banUser(userId: number, status: boolean) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new BadRequestException("user doesn't exist");
    return await this.userRepository.update(user.id, { banned: status });
  }
}
