import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost/desafiodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(db => console.log("DB connected"))
  .catch(error => console.log(error))