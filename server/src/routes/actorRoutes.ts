import { Router } from "express"
import { create_actor, delete_actor, find_all_actors, find_single_actor, update_actor } from "../controllers/actorController"
const router= Router()


router.post("/actors/", create_actor )
router.get("/actors/", find_all_actors )
router.get("/actors/:id", find_single_actor )
router.delete("/actors/:id", delete_actor )
router.put("/actors/:id", update_actor )


export default router