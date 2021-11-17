import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { CreateRoleDto } from 'src/infrastructure/controllers/roles/dto/createRole.dto';
import { Role } from 'src/infrastructure/entities/role.entity';
import { validate } from 'class-validator';
import { BadRequestException, Inject } from '@nestjs/common';

export class RoleUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly roleRepository: IRoleRepository,
  ) {}
  async create(dto: CreateRoleDto): Promise<Role> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException();
    }
    return await this.roleRepository.insert(dto);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }
}
