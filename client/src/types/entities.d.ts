export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl?: any;
  createdAt: Date;
  updatedAt: Date;
  movies: Movie[];
  actors: Actor[];
  comments: Comment[];
}

export interface Movie {
  id: number;
  content: string;
  movieName: string;
  image: string;
  isPublished: boolean;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  comments: Comment[];

}

export interface Actor {
  id: number;
  content: string;
  actorName: string;
  isPublished: boolean;
  likeCount: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  movie: Movie;
  actor: Actor;
}



