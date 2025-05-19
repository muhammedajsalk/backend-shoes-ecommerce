const mongoose=require('mongoose')

const productsSchema=new mongoose.Schema({
    shoe_name:{
        type:String
    },
    brand_name:{
        type:String
    },
    category:{
        type:String
    },
    type:{
        type:String
    },
    amount:{
        type:String
    },
    shoe_image:{
        type:String
    }
})


const productModel=mongoose.model("products",productsSchema)

module.exports=productModel