import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default: false,
        
    },
    mobileNumber:{
        type:String,
    },
    securityQuestion:{
        
    },
    refreshToken:{
        type:String,
        default:""
    },
    accessToken:{
        type:String,
        default:null
    }

})


export const User = mongoose.model("User", UserSchema)