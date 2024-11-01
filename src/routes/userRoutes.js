import express from 'express'
import { Router } from 'express'
import { loginUser, registerUser,getProfile,logoutUser } from '../controllers/userController.js'
import authToken from '../middleware/auth.js'
// import {registerUser} from "../controllers/userController.js"

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.get('/profile',authToken,getProfile)
userRouter.route('/logout').post(logoutUser)



export default userRouter