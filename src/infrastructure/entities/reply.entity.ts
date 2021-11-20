import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';
@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comment, (c) => c.reply)
  comment: Comment;

  @Column()
  message: string;

  @ManyToOne(() => User, (u) => u.replys)
  byUser: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
