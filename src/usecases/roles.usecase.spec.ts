import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from 'src/infrastructure/entities/role.entity';
import { MockRoleRepository } from 'src/infrastructure/repositories/roles/roles.mock.repositoty';
import { RoleUseCases } from './roles.usecase';

describe('Role Usecase', () => {
  let roleUseCases: RoleUseCases;
  let roleMockRepository: MockRoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockRoleRepository,
        {
          provide: RoleUseCases,
          inject: [MockRoleRepository],
          useFactory: (roleMockRepository: MockRoleRepository) =>
            new RoleUseCases(roleMockRepository),
        },
      ],
    }).compile();

    roleUseCases = module.get<RoleUseCases>(RoleUseCases);
    roleMockRepository = module.get<MockRoleRepository>(MockRoleRepository);
  });

  it('Rolse Usecase - should be defined', () => {
    expect(roleUseCases).toBeDefined();
  });

  describe('find all', () => {
    it('should get all roles', async () => {
      const expectedRoles: Role[] = roleMockRepository.roles;
      const roles = await roleUseCases.findAll();
      expect(roles).toEqual(expectedRoles);
    });
  });

  describe('insert new row', () => {
    it('should get all roles', async () => {
      const expectedRoles: Role[] = [
        {
          id: 1,
          title: 'member',
        },
        {
          id: 2,
          title: 'admin',
        },
        {
          id: 3,
          title: 'superadmin',
        },
      ];
      await roleUseCases.create({ title: 'superadmin' });
      const roles = await roleUseCases.findAll();
      expect(roles).toEqual(expectedRoles);
    });
  });

  describe('Error handle', () => {
    it('title is empty', async () => {
      await expect(roleUseCases.create({ title: '' })).rejects.toEqual(
        new BadRequestException(),
      );
    });
  });
});
