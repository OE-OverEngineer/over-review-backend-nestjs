import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Role } from './role.entity';

export enum Gender {
  Male,
  Female,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => Role, (r) => r.users)
  role: Role;

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
  avatar: number;

  @Column()
  birthDate: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  banned: boolean;

  @OneToMany(() => Movie, (m) => m.requestByUser)
  movieRequest: Movie[];
}
