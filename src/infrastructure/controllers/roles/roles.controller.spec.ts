import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from 'src/infrastructure/entities/role.entity';
import { MockRoleRepository } from 'src/infrastructure/repositories/roles/roles.mock.repositoty';
import { RolesUseCases } from 'src/usecases/roles/roles.usecase';
import { RolesController } from './roles.controller';

describe('Role Usecase', () => {
  let rolesController: RolesController;
  let roleUseCases: RolesUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesUseCases,
          useValue: {
            create: jest.fn(() => ({})),
          },
        },
      ],
    }).compile();

    roleUseCases = module.get<RolesUseCases>(RolesUseCases);
    rolesController = module.get<RolesController>(RolesController);
  });

  it('Roles Controller - should be defined', () => {
    expect(rolesController).toBeDefined();
  });

  describe('create roles', () => {
    it('should create roles with title', async (done) => {
      const roleUseCaseCreateSpy = jest.spyOn(roleUseCases, 'create');
      try {
        await rolesController.create({ title: '' });
      } catch (e) {
        expect(e).toThrow(BadRequestException);
        done();
      }
    });
  });
});
