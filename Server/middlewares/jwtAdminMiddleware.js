const jwt = require('jsonwebtoken')
require('dotenv').config()


function jwtAdminMiddleware(req, res, next) {
    try {
        const token = req.cookies.accesTokken
        if (!token) return res.status(400).json({ success: false, message: "the token not provided" })
        jwt.verify(token, process.env.ADMIN_JWT_SECRETCODE, (err, decode) => {
            if (err) return res.status(400).json({ success: false, message: "the token invalid or experin" })
            req.user = decode
            next()
        })
    } catch (error) {
      res.status(500).json({success:false,message:"internal server error"})
      console.log(`the jwt error`+error)
    }
}

module.exports=jwtAdminMiddleware