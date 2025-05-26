const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    profileImg: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    resetToken:{
        type:String,
        default:""
    },
    resetTokenExpery:{
        type:Date
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
},
)

const userModel = mongoose.model("user", userSchema)

module.exports = userModel