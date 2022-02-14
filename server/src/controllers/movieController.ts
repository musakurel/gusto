import { RequestHandler } from "express";
import { User } from "../entity/User";
import { Movie } from "../entity/Movie";

//CREATE MOVIE
export const create_movie: RequestHandler = async (req, res) => {
  const { id, movieName, content, isPublished, image } = req.body;

  console.log("isPublished?:", isPublished);
  try {
    const user = await User.findOneOrFail({ where: { id } });

    const movie = new Movie();
    movie.content = content;
    movie.image = image;
    movie.movieName = movieName;
    if (isPublished) {
      movie.isPublished = true;
    }
    movie.user = user;
    await movie.save();

    return res.redirect(`${process.env.FE_HOST}movies`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Movie not created" });
  }
};

//FIND ALL PUBLISHED MOVIES

export const find_all_movies: RequestHandler = async (req, res) => {
  try {
    const movies = await Movie.find({
      where: { isPublished: true },
      relations: ["user","comments"],
      order: {
        updatedAt: "DESC",
      },
    });

    return res.json(movies);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Movies not found" });
  }
};

// FIND SINGLE MOVIE
export const find_single_movie: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findOneOrFail({
      where: { id },
      relations: ["user"],
    });

    return res.json(movie);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Movie not found" });
  }
};

// DELETE MOVIE

export const delete_movie: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findOneOrFail({ where: { id } });

    await movie.remove();

    return res.status(204).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Movie deleted failed" });
  }
};

// UPDATE MOVIE
export const update_movie: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const { content, movieName, isPublished, image } = req.body;

  try {
    const movie = await Movie.findOneOrFail({
      where: { id },
      relations: ["user"],
    });
    movie.content = content || movie.content;
    movie.movieName = movieName || movie.movieName;
    movie.image = image || movie.image;
    movie.isPublished = isPublished ? isPublished : false;

    await movie.save();

    return res.redirect(`${process.env.FE_HOST}movies`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
