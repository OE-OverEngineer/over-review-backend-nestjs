import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  roleId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: Date;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column()
  avartar: number;

  @Column()
  birthDate: Date;

  @Column()
  gender: 'f' | 'm';

  @Column()
  banned: boolean;
}
