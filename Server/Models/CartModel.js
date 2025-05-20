const mongoose=require('mongoose')


const cartShema=mongoose.Schema({
    cartBy:{
        type:String,
        require:true
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

const cartModel=mongoose.model("Cart",cartShema)

module.exports=cartModel