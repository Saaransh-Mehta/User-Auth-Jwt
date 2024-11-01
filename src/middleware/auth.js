import jwt from 'jsonwebtoken'

const authToken = async(req,res,next)=>{
    console.log(req.cookies.jwt)
    try{
        const token = req.cookies.jwt
        const adminToken = req.cookies.adminJwt
        if(adminToken){
            jwt.verify(adminToken,process.env.ADMIN_JWT_KEY,(err,decoded)=>{
                if(err){
                    console.log("Error occured during admin pannel")
                }else{
                    console.log("Logged In as admin")
                    req.user = decoded
                    console.log(user)
                    next()
                }
            })
        }
        if(!token){
            throw new Error("Token not found")
        }
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err){
                console.log(err)
            }
            req.user = decoded
            console.log("Logged in as user")
            console.log(req.user)
            next()
        })

    }catch(error){
        throw new Error(error)
    }
}

export default authToken