import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ReviewsUsecase } from 'src/usecases/reviews.usecase';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsReviewFoundConstraint implements ValidatorConstraintInterface {
  constructor(private readonly reviewsUsecases: ReviewsUsecase) {}
  validate(id: any) {
    return this.reviewsUsecases.findOne(id).then((review) => {
      if (review) return true;
      return false;
    });
  }
  defaultMessage() {
    return 'review not found';
  }
}

/**  This is for decoration validator */

export function IsReviewFound(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsReviewFound',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsReviewFoundConstraint,
    });
  };
}
