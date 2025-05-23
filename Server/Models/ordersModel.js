const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    orderBy:{
        type:String,
    },
    items:[
        {
            productId:{
                type:String,
                ref: 'products'
            },
            quantity:{
                type:Number
            },
            price:{
                type:Number
            }
        }
    ],
    total:{
        type:Number,
    },
    stutus:{
        type:String,
        enum:["conformed","pending","shipped","delivered"],
        default:"pending"
    },
    paymentMethod:{
        type:String,
        enum:["COD","Razorpay"]
    },
    createdAt:{
        type:String
    }
})

const orderModel=mongoose.model("orders",orderSchema)

module.exports=orderModel