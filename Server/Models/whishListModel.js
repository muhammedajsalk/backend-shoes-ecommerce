const mongoose=require('mongoose')

const wishlistSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    productIds:[
        {
            productId:{
                type:String,
                ref: 'products'
            }
        }
    ],
    addedAt:{
        type:String
    }
})

const wishlistModel=mongoose.model("wishliststs",wishlistSchema)

module.exports=wishlistModel