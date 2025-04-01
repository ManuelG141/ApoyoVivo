import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth'

const app = express()

app.use(morgan(':remote-addr [:date[clf]] :method :url :status - :response-time ms')) // To see HTTP requests in the console
app.use(express.json()) // To parse JSON bodies
app.use(cookieParser())

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost', // Url of the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Allow cookies to be sent in the requests
}))

app.use('/auth', authRoutes)

export default app
