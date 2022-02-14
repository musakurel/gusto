import { Router } from "express";
import {
  create_movie,
  delete_movie,
  find_all_movies,
  find_single_movie,
  update_movie,
} from "../controllers/movieController";
const router = Router();

router.post("/movies/", create_movie);
router.get("/movies/", find_all_movies);
router.get("/movies/:id", find_single_movie);
router.delete("/movies/:id", delete_movie);
router.put("/movies/:id", update_movie);

export default router;
