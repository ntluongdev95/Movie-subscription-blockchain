import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser' 
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import planRoutes from './routes/planRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use(express.json())

app.use('/api/user',userRoutes)
app.use('/api/plan',planRoutes)

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 3100
app.listen(PORT ,console.log(`Server is runing on port ${process.env.PORT}`))