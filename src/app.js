import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import productsRoutes from './routes/products.routes'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(cors({ origin: true }))

app.get('/' , (req, res) => {
  res.json({
    author: "Kevin",
    version: "1.0.0",
    description: "Desafio Ecommerce"
  })
})

app.use('/products', productsRoutes)

export default app