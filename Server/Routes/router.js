const express=require('express')
const router=express.Router()
const {registerPost,loginPost,resetPassword}=require("../Controller/controller")


router.post('/register',registerPost)

router.post("/login",loginPost)

router.patch("/new-password",resetPassword)

module.exports=router