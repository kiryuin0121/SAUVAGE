import { Router } from "express";
import { createProduct, getAllProducts, getProduct } from "../controllers/product";

const router = Router();

// 商品一覧情報を返す
router.get("/",getAllProducts);

// 商品詳細情報を返す
router.get("/:id",getProduct);

router.post("/",createProduct)

export default router;