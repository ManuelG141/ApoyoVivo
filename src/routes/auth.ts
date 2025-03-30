import { Router } from 'express'
import * as authServices from '../services/authServices'

import { validateSchema } from '../middlewares/authValidator'
import { registerSchema, loginSchema } from '../schemas/auth'

const router = Router()

// WORKING
router.post('/register', validateSchema(registerSchema), authServices.registerUser)

// WORKING
router.post('/login', validateSchema(loginSchema), authServices.loginUser)

// WORKING
router.delete('/logout', authServices.logoutUser)

router.get('/profile', authServices.getUserProfile)

router.put('/profile', authServices.updateUserProfile)

router.delete('/profile', authServices.deleteUserProfile)

// WORKING
router.get('/verify', authServices.verifyUserToken)

export default router
