import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth'
import cors_config from './cors_config'

const app = express()

app.use(morgan(':remote-addr [:date[clf]] :method :url :status - :response-time ms')) // To see HTTP requests in the console
app.use(express.json()) // To parse JSON bodies
app.use(cookieParser())

// Configure CORS to allow requests from the frontend
app.use(cors_config)

app.use('/auth', authRoutes)

export default app
