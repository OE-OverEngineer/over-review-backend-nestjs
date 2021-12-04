import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (u) => u.reported)
  targetUser: User;

  @ManyToOne(() => User, (u) => u.reports)
  byUser: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
