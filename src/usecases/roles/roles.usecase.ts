import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { CreateRoleDto } from 'src/infrastructure/dto/roles/createRole.dto';
import { Role } from 'src/infrastructure/entities/role.entity';
import { validate } from 'class-validator';
import { BadRequestException, Inject } from '@nestjs/common';

export class RolesUseCases {
  constructor(private readonly roleRepository: IRoleRepository) {}
  async create(dto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.insert(dto);
  }
  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findByID(id);
  }
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }
}
