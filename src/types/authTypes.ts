export interface User {
  id: number
  name: string
  username: string
  email: string
  password: string
  createdAt: Date
}

export type newUserType = Omit<User, 'id' | 'name' | 'createdAt'>
export type loginUserType = Pick<User, 'email' | 'password'>
