export enum UserRole {
  user = 'user',
  admin = 'admin'
}

export interface User {
  id: number
  name: string
  streak: number
  role: UserRole
  username: string
  email: string
  password: string
  createdAt: Date
}

export type newUserType = Omit<User, 'id' | 'name' | 'createdAt' | 'streak'>
export type loginUserType = Pick<User, 'email' | 'password'>
