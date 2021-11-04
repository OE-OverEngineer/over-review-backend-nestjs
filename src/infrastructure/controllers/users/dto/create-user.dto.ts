export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female';
}
