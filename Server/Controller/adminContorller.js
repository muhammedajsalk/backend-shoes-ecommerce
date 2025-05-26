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
        res.status(200).json({success:true, data: userData })
    } catch (error) {
        res.status(200).json({success:false,message:"internal server error"})
    }
}



module.exports = { getAllUser }