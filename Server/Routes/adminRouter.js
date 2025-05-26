const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const {getAllUser}=require('../Controller/adminContorller')


router.get("/users",jwtMiddleware,getAllUser)


module.exports=router