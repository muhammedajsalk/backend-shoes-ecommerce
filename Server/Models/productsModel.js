const mongoose=require('mongoose')

const productsSchema=new mongoose.Schema({
    shoe_name:{
        type:String
    },
    brand_name:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    type:{
        type:String
    },
    amount:{
        type:Number
    },
    count:{
        type:Number
    },
    images:[
        {
            type:String
        }
    ],
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
})


const productModel=mongoose.model("products",productsSchema)

module.exports=productModel