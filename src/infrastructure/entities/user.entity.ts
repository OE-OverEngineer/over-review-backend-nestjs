import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Movie } from './movie.entity';
import { Reply } from './reply.entity';
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

  @Column({ nullable: true })
  avatarUrl: string;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  gender: 'Male' | 'Female';

  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => Movie, (m) => m.requestByUser)
  movieRequest?: Movie[];

  @ManyToOne(() => Report, (r) => r.byUser)
  reports?: Report[];

  @ManyToOne(() => Report, (r) => r.targetUser)
  reported?: Report[];

  @OneToMany(() => Review, (r) => r.user)
  reviews?: Review[];

  @OneToMany(() => Comment, (c) => c.user)
  comments?: Comment[];

  @OneToMany(() => Reply, (r) => r.byUser)
  replys?: Reply[];

  @OneToMany(() => Like, (l) => l.byUser)
  likes?: Reply[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  amountReviews?: number;
}
