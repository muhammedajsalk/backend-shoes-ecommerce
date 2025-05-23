const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const {userRegister,userLogin,resetPassword,getAllProducts,getProductsById,getProductByCategory,addProductToCart,getAllCartProducts,postOrders,getOrders,userWhislistPost,getWhishList}=require("../Controller/userController")


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

router.post("/:id/wishlists",jwtMiddleware,userWhislistPost)

router.get('/:id/wishlists',jwtMiddleware,getWhishList)

module.exports=router