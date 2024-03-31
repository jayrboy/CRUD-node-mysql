import express from 'express'
import product from './routes/product.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('CRUD MySQL')
})

app.use('/api', product)

app.listen(port, () =>
  console.log('Server running at http://localhost:%s', port)
)
