import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCommentFoundConstraint implements ValidatorConstraintInterface {
  constructor(private readonly commentsUsecases: CommentsUseCases) {}
  validate(id: any) {
    return this.commentsUsecases.findOne(id).then((c) => {
      if (c) return true;
      return false;
    });
  }
  defaultMessage() {
    return 'comment not found';
  }
}

/**  This is for decoration validator */

export function IsCommentFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCommentFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCommentFoundConstraint,
    });
  };
}
