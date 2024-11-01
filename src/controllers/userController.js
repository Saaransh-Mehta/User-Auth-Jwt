import express from "express"
import { User } from "../models/UserSchema.js"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
const registerUser = async(req,res)=> {
const {username , email , password, mobileNumber} = req.body
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
email.toLowerCase();
if(!emailRegex.test(email)){
    throw new Error("Please enter a valid email")
}

console.log(username)
if(!username || !email || !password){
    throw new Error("Please add all fields")
}

const ExistingUser = await User.findOne({email})
if(ExistingUser){
    throw new Error("User already exists")
}

const existingUsername = await User.findOne({username})
if(existingUsername){
    throw new Error("Username already exists please choose another one")
}
const user = await User.create({
    username,
    email,
    password,
    mobileNumber
}
)


return res.status(200).json({
success: true,
data: user
}
)
}

const loginUser = async(req,res)=>{


    const {email,password} = req.body
    
    if(!email || !password){
        throw new Error("Required fields are missing")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new Error("User doesn't exist please register")
    }
    if(email === "admin12@gmail.com"){
        user.isAdmin = true
    }
    
    const isPassCorrect = user.password === password
    if(!isPassCorrect){
        throw new Error("Incorrect password")
    }
    console.log(user)
   
    const token = jwt.sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"1h"})
user.refreshToken = token
await user.save();
const adminToken = jwt.sign({userId:user._id, isAdmin:user.isAdmin},process.env.ADMIN_JWT_KEY,{expiresIn:"24h"})
if(user.isAdmin){
    user.accessToken = adminToken
    await user.save();
    res.cookie('adminJwt', adminToken,{
        httpOnly:true,
        secure:true
    })
    console.log("Logged in as admin")
}
if(!user.isAdmin){
    console.log("Logged in as user")
}
 


res.cookie('jwt',token ,{
    httpOnly:true,
    maxAge: 24 * 60 * 60 * 1000,
    secure:true
})
    
    return res.status(200).json({
        success:true,
        data:user
    })
}

const getProfile = async(req,res)=>{
    const user = req.user

    return res.status(200).json({
        success:true,
        data:user
    })

}

const logoutUser = async(req,res)=>{
    res.clearCookie('jwt',{
        httpOnly:true,
        secure:true
    })
    res.clearCookie('adminJwt',{
        httpOnly:true,
        secure:true
    })
    return res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
    
}

export  {registerUser,loginUser,getProfile,logoutUser}