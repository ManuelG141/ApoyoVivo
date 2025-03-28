// import { User, newUser } from '../types/authTypes'
import { Request, Response } from 'express'
import { newUserType, loginUserType } from '../types/authTypes'

export const registerUser = async (req: Request<any>, res: Response<any>): Promise<void> => {
  const user: newUserType = req.body // After Schema Validation, store validated user info
  console.log(user)
  console.log('User Registed...')
  res.status(200).send('User registered')
}

export const loginUser = async (req: Request<any>, res: Response<any>): Promise<void> => {
  const user: loginUserType = req.body // After Schema Validation, store validated user info
  console.log(user)
  console.log('User Logged In...')
  res.status(200).send('User Logged In')
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
