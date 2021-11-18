import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RoleUseCases } from 'src/usecases/roles/roles.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRoleAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly roleUsecases: RoleUseCases) {}
  validate(id: any) {
    return this.roleUsecases.findOne(id).then((role) => role != undefined);
  }
  defaultMessage() {
    return 'role not found';
  }
}

export function IsRoleAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsRoleAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsRoleAlreadyExistConstraint,
    });
  };
}
