const express=require('express')
const router=express.Router()
const jwtAdminMiddleware=require("../middlewares/jwtAdminMiddleware")
const {getAllUser,adminLogin}=require('../Controller/adminContorller')


router.get("/users",jwtAdminMiddleware,getAllUser)

router.post("/login",adminLogin)


module.exports=router