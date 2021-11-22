import { PartialType } from '@nestjs/mapped-types';
import { CreateReplyDto } from './createReply.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {}
