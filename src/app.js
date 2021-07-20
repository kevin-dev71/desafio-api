import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import {createRoles} from './libs/initialSetup'

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import orderRoutes from './routes/order.routes'
import cookieParser from 'cookie-parser'

const app = express()
createRoles() // aad database with the admin role and user role for User Model

app.use(morgan('dev'))

app.use(express.json())
app.use(cors({ origin: true }))
app.use(cookieParser());

app.get('/' , (req, res) => {
  res.json({
    author: "Kevin",
    version: "1.0.0",
    description: "Desafio Ecommerce"
  })
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/order', orderRoutes)

export default app