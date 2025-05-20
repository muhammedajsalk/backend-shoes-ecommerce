const express=require('express')
const router=express.Router()
const {registerPost,loginPost,resetPassword,getAllProducts,getProductsById}=require("../Controller/controller")


router.post('/register',registerPost)

router.post("/login",loginPost)

router.patch("/new-password",resetPassword)

router.get("/products",getAllProducts)

router.get("/products/:id",getProductsById)

module.exports=router