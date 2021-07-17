import { Router } from "express"
const router = Router()

import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller"

router.get("/", getProducts)
router.post("/", createProduct)
router.get("/:productId", getProductById)
router.put("/:productId", updateProductById)
router.delete("/:productId", deleteProductById)

export default router
