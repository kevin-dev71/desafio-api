import { Schema , model } from 'mongoose'

const orderSchema = new Schema({
  cart: Array,
  total: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  address: String,
  delivered: { 
    type: Boolean,
    default: false
  }
} , {
  versionKey: false,
  timestamps: true
})

export default model("Order" , orderSchema)