// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './createUser.dto';

// // export class UpdateUserDto extends PartialType(CreateUserDto) {}
// import { ApiProperty, OmitType } from '@nestjs/swagger';
// import { IsNotEmpty } from 'class-validator';

// export class UpdateUserDto extends OmitType(CreateUserDto, [
//   'roleID',
//   'avatarUrl',
// ]) {
//   @ApiProperty()
//   @IsNotEmpty()
//   avatar: string;
// }
