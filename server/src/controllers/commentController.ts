import { RequestHandler } from "express";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";
import { Movie } from "../entity/Movie";
import { Actor } from "../entity/Actor";

//CREATE COMMENT
export const create_comment: RequestHandler = async (req, res) => {
  const { userId, movieId, actorId, content } = req.body;
  console.log(req.body);
  try {
    let movie;
    let actor;
    const comment = new Comment();
    if (movieId) {
      movie = await Movie.findOneOrFail({ where: { id: movieId } });
      comment.movie = movie;
    }
    if (actorId) {
      actor = await Actor.findOneOrFail({ where: { id: actorId } });
      comment.actor = actor;
    }
    const user = await User.findOneOrFail({ where: { id: userId } });
    console.log("actor:", actor, "movie:", movie);
    comment.content = content;
    comment.user = user;
    await comment.save();

    return res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "comment not created" });
  }
};





//FIND ALL COMMENTS

export const find_all_comments: RequestHandler = async (req, res) => {
  try {
    const comments = await Comment.find({
      relations: ["user", "movie", "actor"],
    });

    return res.json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "comments not found" });
  }
};

// FIND SINGLE COMMENT
export const find_single_comment: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const comment = await Comment.findOneOrFail({
      where: { id },
      relations: ["user", "movie", "actor"],
    });

    return res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "comment not found" });
  }
};

// DELETE ACTOR

export const delete_comment: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const comment = await Comment.findOneOrFail({ where: { id } });

    await comment.remove();

    return res.json({ message: "comment deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "comment delete failed" });
  }
};

// UPDATE ACTOR
export const update_actor: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const { content, actorName, isPublished } = req.body;

  try {
    const actor = await Actor.findOneOrFail({
      where: { id },
      relations: ["user"],
    });
    actor.content = content || actor.content;
    actor.actorName = actorName || actor.actorName;
    actor.isPublished = isPublished ? isPublished : false;

    await actor.save();

    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
