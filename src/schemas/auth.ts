import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string'
  }).min(3, {
    message: 'Username must be at least 3 characters long'
  }).max(20, {
    message: 'Username must be at most 20 characters long'
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }).email({
    message: 'Invalid email address'
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(6, {
    message: 'Password must be at least 6 characters long'
  }).max(20, {
    message: 'Password must be at most 20 characters long'
  }).regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter and one number'
  })
})

export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }).email({
    message: 'Invalid email'
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(6, {
    message: 'Password must be at least 6 characters'
  }).max(20, {
    message: 'Password must not exceed 20 characters'
  })
})

export const profileSchema = z.object({})
