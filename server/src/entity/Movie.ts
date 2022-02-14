import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  movieName: string;

  @Column()
  image: string;

  @Column({default:false})
  isPublished: boolean;

  @Column({default:0})
  likeCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.movies)
  user: User;

  @OneToMany((type) => Comment, (comment) => comment.movie)
  comments: Comment[];
}
