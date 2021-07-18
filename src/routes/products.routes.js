import { Router } from "express"
import Product from "../models/Product"
const router = Router()

import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller"

// find Product by id middleware
async function findProductById(req, res, next){
  let product
  try {
    product = await Product.findById(req.params.productId)
    if(product == null){
      return res.status(404).json({ message: "Cannot find product"})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.product = product
  next()
}

// ROUTES

router.get("/", getProducts)
router.post("/", createProduct)
router.get("/:productId", findProductById, getProductById)
router.patch("/:productId", findProductById, updateProductById)
router.delete("/:productId", findProductById, deleteProductById)

export default router
