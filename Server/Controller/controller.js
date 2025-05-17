const userModel = require("../Models/usersModel")

async function registerPost(req, res) {
    try {
        const newData = new userModel(req.body)
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
