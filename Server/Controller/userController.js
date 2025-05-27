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

const jwt_secret_code = process.env.JWT_SECRETCODE

async function userRegister(req, res) {
    try {
        const { name, email, password } = req.body
        const saltRounds = 10
        const hashedpassword = await bycrypt.hash(password, saltRounds)
        const emailMatch = await userModel.findOne({ email: email })
        if (emailMatch) return res.status(400).json({
            success: false,
            message: "Email already exists, please use another email"
        })
        const newData = new userModel({
            name: name,
            email: email,
            password: hashedpassword,
            profileImg: "",
            createdAt: moment(userModel.createdAt).tz("Asia/Kolkata").format(),
            updatedAt: moment(userModel.updatedAt).tz("Asia/Kolkata").format()
        })
        const saved = await newData.save()
        const accesTokken = await jwt.sign({ id: newData._id }, jwt_secret_code, { expiresIn: '1h' })
        res.cookie("accesTokken", accesTokken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })
        res.json({ success: true, message: "user is registered" })
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



async function userLogin(req, res) {
    try {
        const getUser = await userModel.findOne({ email: req.body.email })
        if (getUser == null) return res.status(400).json({ success: false, message: "You entered incorrect details" })
        const { password, _id } = getUser
        const match = await bycrypt.compare(req.body.password, password)
        if (!match) return res.status(400).json({ success: false, message: "Your password is incorrect" })
        const accesTokken = await jwt.sign({ id: _id }, jwt_secret_code, { expiresIn: '1h' })
        res.cookie("accesTokken", accesTokken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })
        res.json({ success: true, message: "user is loged", data: getUser })
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



async function addProductToCart(req, res) {
    try {
        const product_id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(product_id)) return res.status(400).json({ success: false, message: "the product id is invalid" })
        const productData = await productModel.findById(product_id)
        if (!productData) return res.status(400).json({ success: false, message: "product not found" });
        const userId = req.user.id
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ success: false, message: "the user id is invaild" })
        const cartUser = await cartModel.findOne({ cartBy: userId })
        if (!cartUser) {
            const newData = new cartModel({
                cartBy: req.user.id,
                items: [{
                    productId: product_id,
                    quantity: 1
                }],
                createdAt: moment().tz("Asia/Kolkata").format(),
                updatedAt: moment().tz("Asia/Kolkata").format()
            })
            const saved = await newData.save()
            return res.status(201).json({ success: true, data: saved })
        }

        const existingItem = await cartModel.findOne({
            cartBy: userId,
            "items.productId": product_id
        });
        if (existingItem) {
            const updatedCart = await cartModel.findOneAndUpdate(
                {
                    cartBy: userId,
                    "items.productId": product_id
                },
                {
                    $inc: { "items.$.quantity": 1 },
                    $set: { updatedAt: moment().tz("Asia/Kolkata").format() }
                },
                { new: true }
            );
            return res.status(200).json({ success: true, data: updatedCart });
        } else {
            const addedCart = await cartModel.updateOne(
                { cartBy: userId },
                {
                    $push: { items: { productId: product_id, quantity: 1 } },
                    $set: { updatedAt: moment().tz("Asia/Kolkata").format() }
                },

            )
            return res.status(200).json({ success: true, data: addedCart })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "internal server error" });
    }
}




async function getAllCartProducts(req, res) {
    try {
        const paramsUserId = req.params.id
        const tokenUserId = req.user
        if (paramsUserId !== tokenUserId) return res.status(400).json({ success: false, message: "user is not authorized" })
        const userCartData = await cartModel.findOne({ cartBy: paramsUserId }).populate('items.productId')
        if (userCartData == null || userCartData.items.length === 0) return res.status(200).json({ success: true, data: "no product in cart" })
        const cartproductdetails = userCartData.items.map(item => (
            {
                quantity: item.quantity,
                productId: item.productId
            }
        ))
        res.status(200).json({ success: true, data: cartproductdetails })
    } catch (error) {
        res.status(500).json({ success: false, message: "interanal server error" })
    }

}




async function postOrders(req, res) {
    try {
        const tokenId = req.user.id
        const paramId = req.params.id
        if (tokenId !== paramId) return res.status(400).json({ success: false, message: "the user is mismatched" })
        const productsId = req.body.productsId
        const productId = req.body.productId
        if (!productsId) {
            const checkProductAvailable = await productModel.findOne({ _id: productId })
            console.log(checkProductAvailable)
            if (!checkProductAvailable) return res.status(400).json({ success: false, message: "the product is not our product database" })
            if (checkProductAvailable.count < 1) return res.status(400).json({ success: false, message: "the product is out of stock" })
            const createOrder = new orderModel({
                orderBy: paramId,
                items: [
                    {
                        productId: checkProductAvailable._id,
                        quantity: 1,
                        price: checkProductAvailable.amount
                    }
                ],
                total: checkProductAvailable.amount * 1,
                stutus: "conformed",
                paymentMethod: req.body.paymentMethod,
                createdAt: moment().tz("Asia/Kolkata").format()
            })

            const save = await createOrder.save()
            await productModel.updateOne({ _id: checkProductAvailable._id }, { $set: { count: checkProductAvailable.count - 1 } })
            return res.status(200).json({ success: true, message: "succefully send order", data: save })
        }
        if (!Array.isArray(productsId) || productsId.length === 0) return res.status(400).json({ success: false, message: "products must non empty array" })

        const items = []
        let total = 0

        for (const product of productsId) {
            const { products_id, quantity } = product
            const productsDatas = await productModel.findById(product.products_id)
            console.log(productsDatas)
            console.log(productsId.length)
            console.log(productsDatas.length)
            if (!productsDatas) return res.status(400).json({ success: false, message: `the ${products_id} is not dataBase` })
            if (productsDatas.count < quantity) return res.status(400).json({ success: false, message: `${productsDatas.shoe_name} only has ${productsDatas.count} in stock` });
            items.push({
                productId: products_id,
                quantity: quantity,
                price: productsDatas.amount
            })
            total += productsDatas.amount * quantity
            productsDatas.count -= quantity
            await productsDatas.save()
        }

        const createOrder = new orderModel({
            orderBy: paramId,
            items: items,
            total: total,
            stutus: "conformed",
            paymentMethod: req.body.paymentMethod,
            createdAt: moment().tz("Asia/Kolkata").format()
        })
        const save = await createOrder.save()
        return res.status(200).json({ success: true, data: save })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal Server Error" })
        console.log("internal error " + error)
    }
}

async function getOrders(req, res) {
    try {
        const userId = req.user.id
        const ordersData = await orderModel.find({ orderBy: userId }).populate("items.productId")
        if (!ordersData) return res.status(400).json({ success: false, message: "order details is empty" })
        res.status(200).json({ success: true, data: ordersData })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server erorr" })
    }
}

async function userWhislistPost(req, res) {
    try {
        const userId = req.user.id
        const productId = req.params.id
        const userWhislist = await wishlistModel.findOne({ userId: userId })
        if (!userWhislist) {
            const newuserWhislist = new wishlistModel({
                userId: userId,
                productIds: [
                    {
                        productId: productId
                    }
                ],
                addedAt: moment().tz("Asia/Kolkata").format()
            })
            const save = await newuserWhislist.save()
            return res.status(200).json({ success: true, data: save, message: "the product added wishlist" })
        }
        const produnctInArray = userWhislist.productIds.find(item => item.productId === productId)
        if (produnctInArray) return res.status(400).json({ success: false, message: "the product is already wishlist" })
        userWhislist.productIds.push({ productId: productId })
        const save = await userWhislist.save()
        return res.status(200).json({ success: true, data: save, message: "the product added wishlist" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

async function getWhishList(req, res) {
    try {
        const userId = req.user.id
        const userWhishlist = await wishlistModel.findOne({ userId: userId }).populate('productIds.productId')
        if (!userWhishlist) return res.status(400).json({ success: false, message: "the whislist is empty" })
        return res.status(200).json({ success: true, data: userWhishlist })
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

module.exports = { userRegister, userLogin, resetPassword, getAllProducts, getProductsById, getProductByCategory, addProductToCart, getAllCartProducts, postOrders, getOrders, userWhislistPost, getWhishList }
