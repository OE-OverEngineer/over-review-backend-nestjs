import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';
import { UpdateProfileDto } from 'src/infrastructure/dto/users/updateProfile.dto';
import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';
// import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';
import { Role } from 'src/infrastructure/entities/role.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { Service } from 'typedi';
import { Repository } from 'typeorm';

@Injectable()
@Service()
export class DatabaseUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly storageService: StorageService,
  ) {}

  async findTopReviewers(amount: number): Promise<User[]> {
    const { entities, raw } = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .addSelect('coalesce(COUNT(reviews.id),0)', 'count')
      .leftJoin('user.reviews', 'reviews')
      .groupBy('user.id')
      .addOrderBy('count', 'DESC')
      .take(amount)
      .getRawAndEntities();
    const response = entities.map((e) => {
      return {
        ...e,
        amountReviews: Number(
          Number(raw.find((i) => i.user_id == e.id).count).toFixed(0),
        ),
      };
    });
    return response;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const dto = await this.dtoToUser(createUserDto);
    const user = await this.userRepository.save(dto);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['role', 'reviews'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
      select: ['password', 'firstName', 'lastName', 'email', 'id', 'role'],
      relations: ['role'],
    });
  }

  async update(
    id: number,
    updateDto: UpdateUserDto | UpdateProfileDto,
  ): Promise<User> {
    const user = await this.findById(id);
    const newUser = { ...user, ...updateDto };
    return await this.userRepository.save(newUser);
  }

  async deleteById(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
  }

  private async dtoToUser(dto: CreateUserDto): Promise<User> {
    const role: Role = new Role();
    role.id = dto.roleId;
    const user: User = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.displayName = dto.displayName;
    user.dateOfBirth = dto.dateOfBirth;
    user.gender = dto.gender;
    user.role = role;

    if (dto.avatar) {
      const randomString = dto.displayName + String(Date.now());
      const avatarUrlBlob = await this.storageService.uploadAvatar(
        dto.avatar,
        randomString,
      );
      user.avatarUrl = avatarUrlBlob;
    }
    return user;
  }

  // private dtoToUser(dto: UpdateUserDto): User {
  //   const role: Role = new Role();
  //   role.id = dto.roleID;
  //   const user: User = new User();
  //   user.email = dto.email;
  //   user.password = dto.password;
  //   user.firstName = dto.firstName;
  //   user.lastName = dto.lastName;
  //   user.displayName = dto.displayName;
  //   user.dateOfBirth = dto.dateOfBirth;
  //   user.gender = dto.gender;
  //   user.avatarUrl = dto.avatarUrl;
  //   user.role = role;
  //   return user;
  // }
}
