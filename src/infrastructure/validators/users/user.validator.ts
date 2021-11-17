import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersUseCases } from 'src/usecases/users.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userUsecases: UsersUseCases) {}
  validate(id: any) {
    return this.userUsecases.findOne(id).then((user) => {
      if (user) return true;
      return false;
    });
  }
  defaultMessage() {
    return 'user not found';
  }
}

@ValidatorConstraint({ async: true })
export class IsUserEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userUsecases: UsersUseCases) {}
  validate(email: string) {
    return this.userUsecases.findByEmail(email).then((user) => {
      if (user) return false;
      return true;
    });
  }
  defaultMessage() {
    return 'email already exists';
  }
}

/**  This is for decoration validator */

export function IsUserEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUserEmailAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsUserEmailAlreadyExistConstraint,
    });
  };
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUserAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
