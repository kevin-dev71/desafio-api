import {Schema, model} from 'mongoose'
 

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true},
  name: String,
  surname: String,
  address: String,
  orderHistory: [{ref: "Order" , type:Schema.Types.ObjectId}],
  roles: [{ ref: "Role", type: Schema.Types.ObjectId }]
}, { timestamps: true , versionKey: false })

export default model('User' , userSchema)