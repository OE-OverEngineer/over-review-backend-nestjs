import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CreateRoleDto } from './createRole.dto';

it('validate DTO', async () => {
  const target: ValidationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
  });
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateRoleDto,
    data: '',
  };
  await target.transform(<CreateRoleDto>{}, metadata).catch((err) => {
    expect(err.getResponse().message).toEqual(['title must be a string']);
  });
});
