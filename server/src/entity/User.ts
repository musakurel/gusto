import { IsEmail, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Actor } from "./Actor";
import { Comment } from "./Comment";
import { Movie } from "./Movie";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(5, 255)
  @IsEmail()
  email: string;

  @Column({nullable:true})
  @Length(5, 255)
  password: string;

  @Column()
  @Length(2, 255)
  firstName: string;

  @Column()
  @Length(2, 255)
  lastName: string;

  @Column({nullable:true})
  imageUrl: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Comment, (comment) => comment.user, {
    cascade: true,
})
  comments: Comment[];

  @OneToMany((type) => Movie, (movie) => movie.user, {
    cascade: true,
})
  movies: Movie[];

  @OneToMany((type) => Actor, (actor) => actor.user, {
    cascade: true,
})
  actors: Actor[];
}
