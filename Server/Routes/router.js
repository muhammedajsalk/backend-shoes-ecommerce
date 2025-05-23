const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const {userRegister,userLogin,resetPassword,getAllProducts,getProductsById,getProductByCategory,addProductToCart,getAllCartProducts,postOrders,getOrders}=require("../Controller/controller")


router.post('/register',userRegister)

router.post("/login",userLogin)

router.patch("/new-password",resetPassword)

router.get("/products",jwtMiddleware,getAllProducts)

router.get("/products/:id",jwtMiddleware,getProductsById)

router.get("/products/category/:category_name",jwtMiddleware,getProductByCategory)

router.post("/:id/cart",jwtMiddleware,addProductToCart)

router.get("/:id/cart",jwtMiddleware,getAllCartProducts)

router.post("/:id/orders",jwtMiddleware,postOrders)

router.get("/:id/orders",jwtMiddleware,getOrders)

module.exports=router