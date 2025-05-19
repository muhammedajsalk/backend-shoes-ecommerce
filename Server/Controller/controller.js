const userModel = require("../Models/usersModel")
const bycrypt = require('bcryptjs')
const moment = require('moment-timezone');
const jwt=require('jsonwebtoken')
require('dotenv').config()

const jwt_secret_code=process.env.JWT_SECRETCODE

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
        res.json({ success: true, data: saved })
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
        if (getUser == null) return res.status(400).json({success:false, message: "You entered incorrect details" })
        const { password,_id } = getUser
        const match =await bycrypt.compare(req.body.password, password)
        if(!match) return res.status(400).json({success:false, message: "Your password is incorrect" })
        const accesTokken=await jwt.sign({id:_id},jwt_secret_code,{expiresIn:'7d'})
        res.status(200).json({success:true, message: "Login successful",token:accesTokken })
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
    }
}

module.exports = { registerPost, loginPost }
