import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ActorsUseCases } from 'src/usecases/actors.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsActorFoundConstraint implements ValidatorConstraintInterface {
  constructor(private readonly actorsUsecases: ActorsUseCases) {}
  validate(id: any) {
    return this.actorsUsecases.findOne(id).then((actor) => {
      if (actor) return true;
      return false;
    });
  }
  defaultMessage() {
    return 'actor not found';
  }
}

@ValidatorConstraint({ async: true })
export class IsActorListFoundConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly actorsUsecases: ActorsUseCases) {}
  validate(ids: number[]) {
    return this.actorsUsecases.findAllByID(ids).then((actors) => {
      if (!actors || actors.length != ids.length) return false;
      return true;
    });
  }
  defaultMessage() {
    return 'actor not found';
  }
}

/**  This is for decoration validator */

export function IsActorFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsActorFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsActorFoundConstraint,
    });
  };
}

export function IsActorListFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsActorListFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsActorListFoundConstraint,
    });
  };
}
