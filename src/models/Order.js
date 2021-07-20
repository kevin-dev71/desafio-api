import { Schema , model } from 'mongoose'

const orderSchema = new Schema({
  cart: Array,
  total: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  delivered: { 
    type: Boolean,
    default: false
  }
} , {
  versionKey: false,
  timestamps: true
})

export default model("Order" , orderSchema)