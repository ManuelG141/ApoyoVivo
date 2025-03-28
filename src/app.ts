import express from 'express'
import morgan from 'morgan'

import authRoutes from './routes/auth'

const app = express()

app.use(morgan(':remote-addr [:date[clf]] :method :url :status - :response-time ms')) // To see HTTP requests in the console
app.use(express.json()) // To parse JSON bodies

app.use('/auth', authRoutes)

export default app
