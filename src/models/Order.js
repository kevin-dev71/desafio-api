import { Schema , model } from 'mongoose'

const orderSchema = new Schema({
  products: [{ref: "Product" , type:Schema.Types.ObjectId}]
} , {
  versionKey: false
})

export default model("Order" , orderSchema)