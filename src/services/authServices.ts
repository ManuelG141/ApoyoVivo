import { Request, Response } from 'express'
import { sendQuery } from './db'
import { newUserType, loginUserType } from '../types/authTypes'
import { hashSync, compareSync } from 'bcrypt-ts'

export const registerUser = async (req: Request<any>, res: Response<any>): Promise<void> => {
  const user: newUserType = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  } // After Schema Validation, store validated user info

  const hashedPassword = hashSync(user.password, 10) // Generate Salt And Hash

  try {
    const query = 'INSERT INTO "users" (username, email, hashed_password) VALUES ($1, $2, $3);'
    const values = [user.username, user.email, hashedPassword] // Values to insert into DB
    await sendQuery(query, values)

    console.log('User Registed...')
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
    const query = 'SELECT hashed_password FROM users WHERE email = $1;'
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

    console.log('User Logged In...')
    res.status(200).send('User Logged In')
  } catch (error: any) {
    console.log(error)
    res.status(500).send('Internal server error ' + (error.detail as string))
  }
}

export const logoutUser = async (_req: Request<any>, res: Response<any>): Promise<void> => {
  console.log('User Logged Out...')
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
