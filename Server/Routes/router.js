const express=require('express')
const router=express.Router()
const {registerPost}=require("../Controller/controller")


router.post('/register',registerPost)

module.exports=router