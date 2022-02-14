import { RequestHandler } from "express";
import { User } from "../entity/User";
import { Actor } from "../entity/Actor";

//CREATE ACTOR
export const create_actor: RequestHandler = async (req, res) => {
  const { id, actorName, content, isPublished, image } = req.body;
  try {
    const user = await User.findOneOrFail({ where: { id } });

    const actor = new Actor();
    actor.image = image;
    actor.content = content;
    actor.actorName = actorName;
    if (isPublished) {
      actor.isPublished = true;
    }
    actor.user = user;
    await actor.save();

    return res.redirect(`${process.env.FE_HOST}actors`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "actor not created" });
  }
};

//FIND ALL ACTORS

export const find_all_actors: RequestHandler = async (req, res) => {
  try {
    const posts = await Actor.find({
      relations: ["user","comments"],
      order: {
        updatedAt: "DESC",
      },
    });

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "actors not found" });
  }
};

// FIND SINGLE ACTOR
export const find_single_actor: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const actor = await Actor.findOneOrFail({
      where: { id },
      relations: ["user", "comments"],
    });

    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "actor not found" });
  }
};

// DELETE ACTOR

export const delete_actor: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const actor = await Actor.findOneOrFail({ where: { id } });

    await actor.remove();

    return res.status(204).json({ message: "actor deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "actor deleted failed" });
  }
};

// UPDATE ACTOR
export const update_actor: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const { content, actorName, isPublished, image } = req.body;

  try {
    const actor = await Actor.findOneOrFail({
      where: { id },
      relations: ["user"],
    });
    actor.content = content || actor.content;
    actor.actorName = actorName || actor.actorName;
    actor.image = image || actor.image;
    actor.isPublished = isPublished ? isPublished : false;

    await actor.save();

    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
