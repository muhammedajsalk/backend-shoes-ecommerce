const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const {registerPost,loginPost,resetPassword,getAllProducts,getProductsById,getProductByCategory}=require("../Controller/controller")


router.post('/register',registerPost)

router.post("/login",loginPost)

router.patch("/new-password",resetPassword)

router.get("/products",jwtMiddleware,getAllProducts)

router.get("/products/:id",jwtMiddleware,getProductsById)

router.get("/products/category/:category_name",jwtMiddleware,getProductByCategory)

module.exports=router