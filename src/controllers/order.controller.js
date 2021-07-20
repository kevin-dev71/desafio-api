import Product from "../models/Product"
import Order from "../models/Order"

export const createOrder = async (req, res) => {
  const { cart, total, address } = req.body

  try {
    const newOrder = new Order({ user: req.user._id, cart, total, address })

    const newOrderSaved = await newOrder.save()

    res.status(201).json({order: newOrderSaved, msg: "Order Created", message: "Order Processed Successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message, err: error.message })
  }
}