import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Movie } from './movie.entity';
import { Report } from './report.entity';
import { Review } from './review.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (r) => r.users)
  role: Role;

  @Column()
  email: string;

  @Column({ select: false })
  password?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column()
  avatar: string;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  gender: 'Male' | 'Female';

  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => Movie, (m) => m.requestByUser)
  movieRequest: Movie[];

  @ManyToOne(() => Report, (r) => r.byUser)
  reports: Report[];

  @ManyToOne(() => Report, (r) => r.targetUser)
  reported: Report[];

  @OneToMany(() => Review, (r) => r.user)
  reviews: Review[];

  @OneToMany(() => Comment, (c) => c.user)
  comments: Comment[];
}
