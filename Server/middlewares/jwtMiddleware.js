const jwt=require('jsonwebtoken')
require('dotenv').config()

const jwt_secret_code = process.env.JWT_SECRETCODE


function jwtMiddleware(req,res,next){
   try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
        if (!token) return res.status(400).json({ success: false, message: "no token provided" })
        jwt.verify(token, jwt_secret_code,async (error, decode) => {
            if (error) return res.status(400).json({ status: false, message: "token is invalid or experied" })
            req.user=decode
        })
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: "jwt error"+error })
    }
}


module.exports=jwtMiddleware