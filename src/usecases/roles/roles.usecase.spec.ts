import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from 'src/infrastructure/entities/role.entity';
import { RoleMockRepository } from 'src/infrastructure/repositories/roles/roles.mock.repositoty';
import { RoleUseCases } from './roles.usecase';

describe('Role Usecase', () => {
  let roleUseCases: RoleUseCases;
  let roleMockRepository: RoleMockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleMockRepository,
        {
          provide: RoleUseCases,
          inject: [RoleMockRepository],
          useFactory: (roleMockRepository: RoleMockRepository) =>
            new RoleUseCases(roleMockRepository),
        },
      ],
    }).compile();

    roleUseCases = module.get<RoleUseCases>(RoleUseCases);
    roleMockRepository = module.get<RoleMockRepository>(RoleMockRepository);
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
      try {
        await roleUseCases.create({ title: '' });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
    it('title is not string', async () => {
      try {
        await roleUseCases.create({ title: undefined });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
