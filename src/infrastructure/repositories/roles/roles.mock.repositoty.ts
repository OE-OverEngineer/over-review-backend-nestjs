import { Injectable } from '@nestjs/common';
import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { CreateRoleDto } from 'src/infrastructure/dto/roles/createRole.dto';
import { Role } from 'src/infrastructure/entities/role.entity';

@Injectable()
export class MockRoleRepository implements IRoleRepository {
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

  async findByID(id: number): Promise<Role > {
    return this.roles.find((e) => e.id == id);
  }
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
