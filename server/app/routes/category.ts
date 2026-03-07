import { Router } from "express";
import { getCategory } from "../controllers/category";


const router = Router();

router.get("/:id",getCategory);

export default router;