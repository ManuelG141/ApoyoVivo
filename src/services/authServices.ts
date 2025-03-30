import { Request, Response } from 'express'
import { hashSync, compareSync } from 'bcrypt-ts'
import { sendQuery } from './db'
import { newUserType, loginUserType, userRole, userWithoutPassword } from '../types/authTypes'
import { createAccessToken, verifyToken } from './jwt'

export const registerUser = async (req: Request<any>, res: Response<any>): Promise<void> => {
  const user: newUserType = {
    role: userRole.user, // Default role is user
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  } // After Schema Validation, store validated user info

  const hashedPassword = hashSync(user.password, 10) // Generate Salt And Hash

  try {
    const query = 'INSERT INTO "users" (role, username, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING id;'
    const values = [user.role, user.username, user.email, hashedPassword]
    const result = await sendQuery(query, values)

    const token = createAccessToken(result[0]) // Create JWT token

    res.cookie('token', token, {})
    res.status(200).send('User registered')
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).send(error.detail) // Conflict
    } else {
      console.log(error)
      res.status(500).send('Internal server error ' + (error.detail as string))
    }
  }
}

export const loginUser = async (req: Request<any>, res: Response<any>): Promise<void> => {
  const user: loginUserType = {
    email: req.body.email,
    password: req.body.password
  } // After Schema Validation, store validated user info

  try {
    const query = 'SELECT hashed_password, id, username, role FROM users WHERE email = $1;'
    const values = [user.email] // Values to insert into DB
    const result = await sendQuery(query, values)

    if (result.length === 0) { // Check if user exists
      res.status(401).send('User is not registed')
      return
    }

    const isPasswordValid = compareSync(user.password, result[0].hashed_password)
    if (!isPasswordValid) { // Check if password is valid
      res.status(401).send('Invalid password')
      return
    }

    const payload: any = {
      id: result[0].id
    }
    const token = createAccessToken(payload) // Create JWT token
    res.cookie('token', token, {
    })

    const userData: any = {
      id: result[0].id,
      username: result[0].username,
      role: result[0].role
    }

    res.status(200).send(userData)
  } catch (error: any) {
    console.log(error)
    res.status(500).send('Internal server error ' + (error.detail as string))
  }
}

export const logoutUser = async (_req: Request<any>, res: Response<any>): Promise<void> => {
  // Elimina la cookie del token estableciendo su expiración en una fecha pasada
  res.cookie('token', '', {
    expires: new Date(0)
  })
  res.status(200).send('User Logged Out')
}

export const getUserProfile = async (req: Request<any>, res: Response<any>): Promise<void> => {
  console.log(req.body)
  console.log('User Profile...')
  res.status(200).send('User Profile')
}

export const updateUserProfile = async (req: Request<any>, res: Response<any>): Promise<void> => {
  console.log(req.body)
  console.log('Profile Updated...')
  res.status(200).send('Profile Updated')
}

export const deleteUserProfile = async (_req: Request<any>, res: Response<any>): Promise<void> => {
  console.log('Profile Deleted...')
  res.status(200).send('Profile Updated')
}

export const verifyUserToken = async (req: Request<any>, res: Response<any>): Promise<void> => {
  const { token } = req.cookies
  try {
    const user = await verifyToken(token) // Verify token

    const query = 'SELECT name, streak, role, username, email, created_at FROM users WHERE id = $1;'
    const values = [user.id] // Values to insert into DB
    const result = await sendQuery(query, values)

    if (result.length === 0) { // Check if user exists
      res.status(401).send('Id was not found')
      return
    }

    const userData: userWithoutPassword = {
      id: user.id,
      name: result[0].name,
      streak: result[0].streak,
      role: result[0].role,
      username: result[0].username,
      email: result[0].email,
      createdAt: result[0].created_at
    }

    res.status(200).send(userData)
  } catch (error: any) {
    res.status(403).send(error.message)
  }
}
