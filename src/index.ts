import express from 'express'
import morgan from 'morgan'

const PORT: number = process.env.PORT as unknown as number

const app = express()
app.use(morgan(':remote-addr [:date[clf]] :method :url :status - :response-time ms')) // To see HTTP requests in the console

app.get('/', (_req, res) => {
    res.send('Hello World!') 
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})