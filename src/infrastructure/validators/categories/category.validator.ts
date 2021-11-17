import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoriesUseCases } from 'src/usecases/categories.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCategoryAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly categoriesUsecases: CategoriesUseCases) {}
  validate(id: any) {
    return this.categoriesUsecases.findOne(id).then((category) => {
      if (category) return true;
      return false;
    });
  }
  defaultMessage() {
    return 'category not found';
  }
}

@ValidatorConstraint({ async: true })
export class IsCategoryTitleAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly categoriesUsecases: CategoriesUseCases) {}
  validate(title: string) {
    return this.categoriesUsecases.findByTitle(title).then((category) => {
      if (category) return false;
      return true;
    });
  }
  defaultMessage() {
    return 'category already exists';
  }
}

/**  This is for decoration validator */

export function IsCategoryAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCategoryAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCategoryAlreadyExistConstraint,
    });
  };
}

export function IsCategoryTitleAlreadyExist(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCategoryTitleAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCategoryTitleAlreadyExistConstraint,
    });
  };
}
