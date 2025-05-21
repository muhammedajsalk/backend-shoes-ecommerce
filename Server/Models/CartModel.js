const mongoose=require('mongoose')


const cartShema=new mongoose.Schema({
    cartBy:{
        type:String
    },
    items:{
        type:Array,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
})

const cartModel=mongoose.model("carts",cartShema)

module.exports=cartModel