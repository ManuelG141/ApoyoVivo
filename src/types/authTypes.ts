export enum userRole {
  user = 'user',
  admin = 'admin'
}
export interface user {
  id: number
  name: string
  streak: number
  role: userRole
  username: string
  email: string
  password: string
  createdAt: Date
}

export type newUserType = Omit<user, 'id' | 'name' | 'createdAt' | 'streak'>
export type loginUserType = Pick<user, 'email' | 'password'>
export type userWithoutPassword = Omit<user, 'password'>
