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
        default: "empty"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    wishlist: {
        type: Array
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