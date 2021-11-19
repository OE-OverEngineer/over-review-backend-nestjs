import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from 'src/infrastructure/entities/role.entity';
import { MockRoleRepository } from 'src/infrastructure/repositories/roles/roles.mock.repositoty';
import { RolesUseCases } from './roles.usecase';

describe('Role Usecase', () => {
  let roleUseCases: RolesUseCases;
  let roleMockRepository: MockRoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockRoleRepository,
        {
          provide: RolesUseCases,
          inject: [MockRoleRepository],
          useFactory: (roleMockRepository: MockRoleRepository) =>
            new RolesUseCases(roleMockRepository),
        },
      ],
    }).compile();

    roleUseCases = module.get<RolesUseCases>(RolesUseCases);
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
    it('title is empty', async (done) => {
      try {
        await roleUseCases.create({ title: '' });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        done();
      }
    });
    it('title is not string', async (done) => {
      try {
        await roleUseCases.create({ title: undefined });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        done();
      }
    });
    it('title is already exists', async (done) => {
      try {
        await roleUseCases.create({ title: 'admin2' });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
        done();
      }
    });
  });
});
