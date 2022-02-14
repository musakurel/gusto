import {Router} from "express"
import { create_comment, delete_comment, find_all_comments, find_single_comment } from "../controllers/commentController"

const router= Router()

router.post("/comments/", create_comment)
router.get("/comments/", find_all_comments)
router.get("/comments/:id", find_single_comment)
router.delete("/comments/:id", delete_comment)

export default router