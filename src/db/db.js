import mongoose from "mongoose";
import express from 'express'

const uri = "mongodb+srv://saaransh1621m:xw99HqBMhDjb7B5V@cluster0.rgxmc.mongodb.net"
const connectDB = async()=>{
    try{
       const connecter = await mongoose.connect(uri)
       if(connecter){
        console.log("Successfully connected")
       }

    }
    catch(err){
        throw new Error(err)
    }
}

export default connectDB