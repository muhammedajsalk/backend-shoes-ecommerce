const express=require('express')
const router=express.Router()
const jwtAdminMiddleware=require("../middlewares/jwtAdminMiddleware")
const {getAllUser,adminLogin,getUserById,addProduct,getAllProducts}=require('../Controller/adminContorller')


router.get("/users",jwtAdminMiddleware,getAllUser)

router.post("/login",adminLogin)

router.get("/users/:id",jwtAdminMiddleware,getUserById)

router.post("/products",jwtAdminMiddleware,addProduct)

router.get("/products",getAllProducts)


module.exports=router