import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { CreateRoleDto } from 'src/infrastructure/dto/roles/createRole.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { Role } from 'src/infrastructure/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseRolesRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleEntityRepository: Repository<Role>,
  ) {}

  // async findAllByID(ids: number[]): Promise<Actor[]> {
  //   return this.roleEntityRepository.find({ where: { id: In(ids) } });
  // }

  // async update(id: number, dto: UpdateActorDto): Promise<Actor> {
  //   /// ANCHOR : ถ้าสมมติอัพเดทภาพ ให้ลบอันเก่าออกมั้ย แล้วลบยังไง (ฺฺฺฺBlob storage)
  //   await this.roleEntityRepository.update(id, { ...dto });
  //   return await this.roleEntityRepository.findOne(id);
  // }

  async insert(newRole: CreateRoleDto): Promise<Role> {
    return await this.roleEntityRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return this.roleEntityRepository.find();
  }

  async findByID(id: number): Promise<Role> {
    return this.roleEntityRepository.findOne({ id });
  }

  // async deleteById(id: number): Promise<void> {
  //   await this.roleEntityRepository.delete(id);
  // }
}
