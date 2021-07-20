import { Router } from 'express'
import * as orderController from '../controllers/order.controller'
import { authJwt } from '../middlewares'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isAuth], orderController.createOrder)

export default router