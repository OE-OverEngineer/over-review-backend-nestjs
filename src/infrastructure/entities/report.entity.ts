import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.reported)
  targetUser: User;

  @ManyToOne(() => User, (u) => u.reports)
  byUser: User;
}
