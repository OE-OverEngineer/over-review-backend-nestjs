import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MoviesUseCases } from 'src/usecases/movies.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsMovieFoundConstraint implements ValidatorConstraintInterface {
  constructor(private readonly moviesUsecases: MoviesUseCases) {}
  validate(id: any) {
    return this.moviesUsecases.findOne(id).then((movie) => {
      if (movie) return true;
      return false;
    });
  }
  defaultMessage() {
    return 'movie not found';
  }
}

/**  This is for decoration validator */

export function IsMovieFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsMovieFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsMovieFoundConstraint,
    });
  };
}
