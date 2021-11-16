import { Injectable } from '@nestjs/common';
import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { CreateRoleDto } from 'src/infrastructure/controllers/roles/dto/createRole.dto';
import { Role } from 'src/infrastructure/entities/role.entity';

@Injectable()
export class RoleMockRepository implements IRoleRepository {
  public roles: Role[] = [
    {
      id: 1,
      title: 'member',
    },
    {
      id: 2,
      title: 'admin',
    },
  ];

  async insert(dto: CreateRoleDto): Promise<Role> {
    const latedId = this.roles[this.roles.length - 1].id + 1;
    const newRole = { id: latedId, title: dto.title };
    this.roles.push(newRole);
    return newRole;
  }
  async findAll(): Promise<Role[]> {
    return this.roles;
  }
  updateById(): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  deleteById(): Promise<Role> {
    throw new Error('Method not implemented.');
  }
}
