import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { json } from 'stream/consumers';
import { CreateRoleDto } from './createRole.dto';

describe('Validate createRole dto', () => {
  it('validate title is correct', async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateRoleDto,
    };
    await target
      .transform(
        <CreateRoleDto>{
          title: 'superadmin',
        },
        metadata,
      )
      .catch((err) => {
        expect(err.getResponse().message).toEqual([]);
      });
  });

  it('validate title is not empty', async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateRoleDto,
    };
    await target.transform(<CreateRoleDto>{}, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'title must be a string',
        'title should not be empty',
      ]);
    });
  });

  it('validate title is not undefined', async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateRoleDto,
    };
    await target
      .transform(
        <CreateRoleDto>{
          title: undefined,
        },
        metadata,
      )
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'title must be a string',
          'title should not be empty',
        ]);
      });
  });
});
