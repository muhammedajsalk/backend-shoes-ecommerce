const userModel = require("../Models/usersModel")
const bycrypt=require('bcryptjs')

async function registerPost(req, res) {
    try {
        const {name,email,password}=req.body
        const saltRounds=10
        const hashedpassword=await bycrypt.hash(password,saltRounds)
        const newData = new userModel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const saved =await newData.save()
        res.json({success:true,data:saved})
    } catch (error) {
        console.log("the eror is"+error)
        if(error.code===11000){
            res.status(400).json({
                success:false,
                message:"Email already exists, please use another email"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error."
            });
        }
    }
}

module.exports = { registerPost }
