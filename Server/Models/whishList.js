const mongoose=require('mongoose')

const wishlistSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    productId:{
        type:String
    },
    addedAt:{
        type:String
    }
})

const wishlistModel=mongoose.model("wishlist",wishlistSchema)

module.exports=wishlistModel