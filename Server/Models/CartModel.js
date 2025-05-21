const mongoose = require('mongoose')


const cartShema = new mongoose.Schema({
    cartBy: {
        type: String
    },
    items: [
        {
            productId: {
                type: String,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
})

const cartModel = mongoose.model("carts", cartShema)

module.exports = cartModel