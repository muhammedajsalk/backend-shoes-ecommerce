const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const {registerPost,loginPost,resetPassword,getAllProducts,getProductsById}=require("../Controller/controller")


router.post('/register',registerPost)

router.post("/login",loginPost)

router.patch("/new-password",resetPassword)

router.get("/products",jwtMiddleware,getAllProducts)

router.get("/products/:id",jwtMiddleware,getProductsById)

module.exports=router