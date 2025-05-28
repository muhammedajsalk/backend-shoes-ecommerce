const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const {userRegister,userLogin,resetPassword,getAllProducts,getProductsById,getProductByCategory,addProductToCart,getAllCartProducts,postOrders,getOrders,userWhislistPost,getWhishList,toMe,logOut}=require("../Controller/userController")


router.post('/register',userRegister)

router.post("/login",userLogin)

router.patch("/new-password",resetPassword)

router.get("/products",getAllProducts)

router.get("/products/:id",getProductsById)

router.get("/products/category/:category_name",getProductByCategory)

router.post("/:id/cart",jwtMiddleware,addProductToCart)

router.get("/:id/cart",jwtMiddleware,getAllCartProducts)

router.post("/:id/orders",jwtMiddleware,postOrders)

router.get("/:id/orders",jwtMiddleware,getOrders)

router.post("/:id/wishlists",jwtMiddleware,userWhislistPost)

router.get('/:id/wishlists',jwtMiddleware,getWhishList)

router.get("/toMe",jwtMiddleware,toMe)

router.post("/logOut",logOut)

module.exports=router