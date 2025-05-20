const userModel = require("../Models/usersModel")
const productModel = require("../Models/productsModel")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const bycrypt = require('bcryptjs')
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwt_secret_code = process.env.JWT_SECRETCODE

async function registerPost(req, res) {
    try {
        const { name, email, password } = req.body
        const saltRounds = 10
        const hashedpassword = await bycrypt.hash(password, saltRounds)
        const newData = new userModel({
            name: name,
            email: email,
            password: hashedpassword,
            profileImg: "",
            createdAt: moment(userModel.createdAt).tz("Asia/Kolkata").format(),
            updatedAt: moment(userModel.updatedAt).tz("Asia/Kolkata").format()
        })
        const saved = await newData.save()
        const accesTokken = await jwt.sign({ id: newData._id }, jwt_secret_code, { expiresIn: '7d' })
        res.json({ success: true, data: saved, token: accesTokken })
    } catch (error) {
        console.log("the eror is" + error)
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: "Email already exists, please use another email"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error."
            });
        }
    }
}

async function loginPost(req, res) {
    try {
        const getUser = await userModel.findOne({ email: req.body.email })
        if (getUser == null) return res.status(400).json({ success: false, message: "You entered incorrect details" })
        const { password, _id } = getUser
        const match = await bycrypt.compare(req.body.password, password)
        if (!match) return res.status(400).json({ success: false, message: "Your password is incorrect" })
        const accesTokken = await jwt.sign({ id: _id }, jwt_secret_code, { expiresIn: '7d' })
        res.status(200).json({ success: true, message: "Login successful", token: accesTokken })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

async function resetPassword(req, res) {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (user == null) return res.status(400).json({ success: false, message: "the details is incorrect" })
        const saltRounds = 10
        const hashedpassword = await bycrypt.hash(req.body.password, saltRounds)
        const match = await bycrypt.compare(req.body.password, user.password)
        if (match) return res.status(400).json({ success: false, message: "the password is same" })
        user.password = hashedpassword
        await user.save()
        res.status(200).json({ success: true, message: "succefully reseted" })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await productModel.find()
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error faching products"
        })
    }
}

async function getProductsById(req, res) {
    try {
        const id = req.params.id
        const getProduct = await productModel.findOne({ _id: id })
        if (getProduct == null) return res.status(400).json({ success: false, message: "the product not in database" })
        res.status(200).json({ success: true, data: getProduct })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error faching products"
        })
    }
}

async function getProductByCategory(req, res) {
    try {
        const category_name = req.params.category_name
        const getProduct = await productModel.find({ category: category_name })
        if (getProduct == null) return res.status(400).json({ success: false, message: "the categories not in database" })
        res.status(200).json({ success: true, data: getProduct })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error faching products"
        })
    }
}
module.exports = { registerPost, loginPost, resetPassword, getAllProducts, getProductsById, getProductByCategory }
