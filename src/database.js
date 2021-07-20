import mongoose from 'mongoose'
import config from './config'

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(db => console.log("DB connected"))
  .catch(error => console.log(error))