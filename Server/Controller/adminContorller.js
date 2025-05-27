const userModel = require("../Models/usersModel")
const productModel = require("../Models/productsModel")
const cartModel = require("../Models/CartModel")
const wishlistModel = require('../Models/whishListModel')
const bycrypt = require('bcryptjs')
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken')
const { default: mongoose } = require("mongoose")
const orderModel = require("../Models/ordersModel")
require('dotenv').config()


async function getAllUser(req, res) {
    try {
        const userData = await userModel.find()
        res.status(200).json({ success: true, data: userData })
    } catch (error) {
        res.status(200).json({ success: false, message: "internal server error" })
    }
}

async function adminLogin(req, res) {
    try {
        const adminEmail = req.body.email
        const adminPassword = req.body.password
        const adminUser = await userModel.findOne({ email: adminEmail, role: "admin" })
        if (!adminUser) return res.status(400).json({ success: false, message: "incorrect details" })
        const match = await bycrypt.compare(adminPassword, adminUser.password)
        if (!match) return res.status(400).json({ success: false, message: "incorrect password" })
        const tokken = jwt.sign({ id: adminUser._id }, process.env.ADMIN_JWT_SECRETCODE, { expiresIn: '24h' })
        res.cookie("accesTokken", tokken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })
        res.status(200).json({ success: true, message: "user is loged" })
    } catch (error) {
        res.status(400).json({ success: false, message: "internal server error" })
        console.log(error)
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.id
        const userData = await userModel.findById({ _id:userId })
        if (!userData) return res.status(400).json({ success: false, message: "the id is not user" })
        res.status(200).json({ success: true, data: userData })
    } catch (error) {
       res.status(400).json({success:false,message:"internal server error"})
       console.log(error)
    }
}

async function addProduct(req,res){
    try {
        const productData=req.body
        const newProductData=new productModel(productData)
        const save=await newProductData.save()
        res.status(200).json({success:true,data:save})
    } catch (error) {
        res.status(200).json({success:false,message:"internal server error"})
        console.log(error);
    }
}

module.exports = { getAllUser, adminLogin ,getUserById,addProduct}