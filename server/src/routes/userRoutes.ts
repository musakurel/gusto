import { Router } from "express";
import {
  update_user,
  delete_user,
  find_single_user,
  find_all_users,
  find_users_movies,
  find_users_actors,
} from "../controllers/userController";
const router = Router();

router.put("/users/:id", update_user);
router.delete("/users/:id", delete_user);
router.get("/users/:id", find_single_user);
router.get("/users", find_all_users);
router.get("/users/movies/:id", find_users_movies);
router.get("/users/actors/:id", find_users_actors);

export default router;
