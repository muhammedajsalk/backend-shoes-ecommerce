const express=require('express')
const router=express.Router()
const jwtAdminMiddleware=require("../middlewares/jwtAdminMiddleware")
const fileUploader=require('../middlewares/multerMiddleware')
const {getAllUser,adminLogin,getUserById,addProduct,getAllProducts,getProductsByCategory,getProductById,editProducts,blockAndUnBlock,getAllOrders}=require('../Controller/adminContorller')

const addProductMid=[jwtAdminMiddleware,fileUploader.single("images")]

router.get("/users",jwtAdminMiddleware,getAllUser)

router.post("/login",adminLogin)

router.get("/users/:id",jwtAdminMiddleware,getUserById)

router.post("/products",addProductMid,addProduct)

router.get("/products",jwtAdminMiddleware,getAllProducts)

router.get("/products/:category",jwtAdminMiddleware,getProductsByCategory)

router.get("/product/:id",jwtAdminMiddleware,getProductById)

router.patch("/products/:id",jwtAdminMiddleware,editProducts)

router.patch("/users/:id",jwtAdminMiddleware,blockAndUnBlock)

router.get("/orders",jwtAdminMiddleware,getAllOrders)


module.exports=router