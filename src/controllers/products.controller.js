import Product from "../models/Product"

export const createProduct = async (req, res) => {
  const { name, price, stock, imgUrl } = req.body

  try {
    const newProduct = new Product({ name, price, stock, imgUrl })

    const productSaved = await newProduct.save()

    res.status(201).json(productSaved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getProductById = async (req, res) => {
  res.json(res.product)
}

export const updateProductById = async (req, res) => {
  if(req.body.name != null) {
    res.product.name = req.body.name
  }
  if(req.body.price != null) {
    res.product.price = req.body.price
  }
  if(req.body.stock != null) {
    res.product.stock = req.body.stock
  }
  if(req.body.imgUrl != null) {
    res.product.imgUrl = req.body.imgUrl
  }
  
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteProductById = async (req, res) => {
  try {
    await res.product.remove()
    res.status(204).json({ message: 'Product deleted'})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
