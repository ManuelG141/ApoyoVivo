import app from './app'

const PORT: number = process.env.PORT as unknown as number

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
