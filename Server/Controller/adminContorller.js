const userModel = require("../Models/usersModel")
const productModel = require("../Models/productsModel")
const cartModel = require("../Models/CartModel")
const wishlistModel = require('../Models/whishListModel')
const bycrypt = require('bcryptjs')
const moment = require('moment-timezone');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken')
const { default: mongoose } = require("mongoose")
const orderModel = require("../Models/ordersModel")
require('dotenv').config()
const multer = require('multer')


async function getAllUser(req, res) {
    try {
        const userData = await userModel.find()
        res.status(200).json({ success: true, data: userData })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
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
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error)
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.id
        const userData = await userModel.findById({ _id: userId })
        if (!userData) return res.status(400).json({ success: false, message: "the id is not user" })
        res.status(200).json({ success: true, data: userData })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error)
    }
}

async function addProduct(req, res) {
    try {
        const { shoe_name, brand_name, type, description, amount, count, category } = req.body
        const newProductData = new productModel({
            shoe_name,
            brand_name,
            type,
            description,
            amount,
            count,
            category,
            images: req.file ? req.file.path : null
        })
        const save = await newProductData.save()
        res.status(200).json({ success: true, data: save })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error);
    }
}

async function getAllProducts(req, res) {
    try {
        const product_data = await productModel.find()
        res.status(200).json({ success: true, data: product_data })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error);
    }
}

async function getProductsByCategory(req, res) {
    try {
        const category = req.params.category
        const categoryDatas = await productModel.find({ category: category })
        if (categoryDatas.length === 0) return res.status(400).json({ success: false, message: "this category not in database" })
        res.status(200).json({ success: true, data: categoryDatas })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error);
    }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id
        const product_data = await productModel.findById(productId)
        if (!product_data) return res.status(400).json({ success: false, message: "the product not found in database" })
        res.status(200).json({ success: true, data: product_data })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error);
    }
}

async function deleteProductById(req, res) {
    try {
        const productId = req.params.id
        const productData = await productModel.deleteOne({ _id: productId })
        if (!productData) return res.status(400).json({ success: false, message: "the product in not in database" })
        res.status(200).json({ success: true, message: "product is succefully deleted" })
    } catch {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error);
    }
}

async function editProducts(req, res) {
  try {
    const productId = req.params.id;
    const updatedFields = { ...req.body };
    if (updatedFields.amount) updatedFields.amount = parseFloat(updatedFields.amount);
    if (updatedFields.count) updatedFields.count = parseInt(updatedFields.count);
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updatedFields.images = uploadResult.secure_url;
    }
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ success: false, message: 'No update fields provided' });
    }
    const updated = await productModel.updateOne(
      { _id: productId },
      { $set: updatedFields }
    );
    if (updated.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


async function blockAndUnBlock(req, res) {
    try {
        const userId = req.params.id
        const isActive = req.body
        const newData = await userModel.updateOne({ _id: userId }, { $set: isActive })
        if (newData.matchedCount === 0) return res.status(400).json({ success: false, message: "the user is not in database" })
        res.status(200).json({ success: true, data: newData, message: !req.body.isActive ? "the user is blocked succefully" : "the user is unBlocked succefully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error)
    }
}


async function getAllOrders(req, res) {
    try {
        const allOrders = await orderModel.find()
        res.status(200).json({ success: true, data: allOrders })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error)
    }
}

module.exports = { getAllUser, adminLogin, getUserById, addProduct, getAllProducts, getProductsByCategory, getProductById, editProducts, blockAndUnBlock, getAllOrders ,deleteProductById}