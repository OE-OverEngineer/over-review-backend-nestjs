import { CreateRoleDto } from 'src/infrastructure/dto/roles/createRole.dto';
import { Role } from 'src/infrastructure/entities/role.entity';

export interface IRoleRepository {
  insert(dto: CreateRoleDto): Promise<Role>;
  findAll(): Promise<Role[]>;
  findByID(id: number): Promise<Role | undefined>;
  // updateById(): Promise<Role>;
  // deleteById(): Promise<Role>;
}
