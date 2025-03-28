import { Router } from 'express'

const router = Router()

router.post('/register', (_req, res) => {
  res.send('Register')
})

router.post('/login', (_req, res) => {
  res.send('Login')
})

router.delete('/logout', (_req, res) => {
  res.send('Logout')
})

router.post('/profile', (_req, res) => {
  res.send('Profile Post')
})

router.get('/profile', (_req, res) => {
  res.send('Profile Get')
})

router.put('/profile', (_req, res) => {
  res.send('Profile Put')
})

router.delete('/profile', (_req, res) => {
  res.send('Profile Delete')
})

router.get('/verify', (_req, res) => {
  res.send('Verify')
})

export default router
