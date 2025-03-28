import { Router } from 'express'
import * as authServices from '../services/authServices'

import { validateSchema } from '../middlewares/authValidator'
import { registerSchema, loginSchema } from '../schemas/auth'

const router = Router()

router.post('/register', validateSchema(registerSchema), authServices.registerUser)

router.post('/login', validateSchema(loginSchema), authServices.loginUser)

router.delete('/logout', authServices.logoutUser)

router.get('/profile', authServices.getUserProfile)

router.put('/profile', authServices.updateUserProfile)

router.delete('/profile', authServices.deleteUserProfile)

router.get('/verify', (_req, res) => {
  res.send('Verify')
})

export default router
