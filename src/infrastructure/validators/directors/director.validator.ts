import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { DirectorsUseCases } from 'src/usecases/directors/directors.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDirectorFoundConstraint implements ValidatorConstraintInterface {
  constructor(private readonly directorsUsecases: DirectorsUseCases) {}
  validate(id: any) {
    return this.directorsUsecases.findOne(id).then((director) => {
      if (director) return true;
      return false;
    });
  }
  defaultMessage() {
    return 'director not found';
  }
}

/**  This is for decoration validator */

export function IsDirectorFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDirectorFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsDirectorFoundConstraint,
    });
  };
}
