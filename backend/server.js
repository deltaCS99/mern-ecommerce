import data from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import express from 'express'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middlerware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })
  
app.use('/api', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5100
app.listen(PORT, console.log(`Server running on ${PORT}`))

export default app