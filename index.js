import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './src/db/db.js'
import userRouter from './src/routes/userRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config({ path: './.env' });
connectDB();


const app = express()


app.get('/',(req,res)=>{
    return res.json("Hello from backend")
})


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(
    
))
app.use('/api/user',userRouter)


app.listen(3000,()=>{
    console.log("app Listening on Port 3000")
})