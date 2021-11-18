import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoriesUseCases } from 'src/usecases/categories/categories.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCategoryFoundConstraint implements ValidatorConstraintInterface {
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
export class IsCategoryListFoundConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly categoriesUsecases: CategoriesUseCases) {}
  validate(ids: number[]) {
    return this.categoriesUsecases.findAllByID(ids).then((category) => {
      if (!category || category.length != ids.length) return false;
      return true;
    });
  }
  defaultMessage() {
    return 'categories not found';
  }
}

/**  This is for decoration validator */

export function IsCategoryFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCategoryFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCategoryFoundConstraint,
    });
  };
}

export function IsCategoryListFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCategoryListFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCategoryListFoundConstraint,
    });
  };
}
// @ValidatorConstraint({ async: true })
// export class IsCategoryTitleAlreadyExistConstraint
//   implements ValidatorConstraintInterface
// {
//   constructor(private readonly categoriesUsecases: CategoriesUseCases) {}
//   validate(title: string) {
//     return this.categoriesUsecases.findByTitle(title).then((category) => {
//       if (category) return false;
//       return true;
//     });
//   }
//   defaultMessage() {
//     return 'category already exists';
//   }
// }
// export function IsCategoryTitleAlreadyExist(
//   validationOptions?: ValidationOptions,
// ) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       name: 'IsCategoryTitleAlreadyExist',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [],
//       options: validationOptions,
//       validator: IsCategoryTitleAlreadyExistConstraint,
//     });
//   };
// }
