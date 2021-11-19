import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RolesUseCases } from 'src/usecases/roles/roles.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRoleFoundConstraint implements ValidatorConstraintInterface {
  constructor(private readonly rolesUsecases: RolesUseCases) {}
  validate(id: any) {
    return this.rolesUsecases.findOne(id).then((role) => role != undefined);
  }
  defaultMessage() {
    return 'role not found';
  }
}

export function IsRoleFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsRoleFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsRoleFoundConstraint,
    });
  };
}
