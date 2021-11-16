import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { DatabaseUsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { UsersUseCases } from 'src/usecases/users.usecase';

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsUserAlreadyExist implements ValidatorConstraintInterface {
//   constructor(private readonly userRepository: IUsersRepository) {}
//   validate(id: any, _: ValidationArguments) {
//     return this.userRepository.findById(id).then((user) => {
//       if (user) return false;
//       return true;
//     });
//   }
// }

@ValidatorConstraint({ name: 'isUserEmailAlreadyExist', async: true })
export class IsUserEmailAlreadyExist implements ValidatorConstraintInterface {
  // constructor(private readonly userRepository: DatabaseUsersRepository) {}
  constructor(private readonly userUsecases: UsersUseCases) {
    this.usecase = userUsecases;
    this.numberTest = 10;
    console.log(this.usecase);
  }
  private usecase: UsersUseCases;
  private numberTest: number;
  validate(email: string) {
    console.log(this.numberTest);
    console.log(this.usecase);

    return this.usecase.findByEmail(email).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

// export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {

//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsUserAlreadyExistConstraint,
//     });
//   };
// }
