import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { verifySignup } from '../middlewares'

const router = Router()

router.post('/signup', [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted], authController.signUp)
router.post('/signin', authController.signIn)
router.post('/accessToken', authController.accessToken)

export default router