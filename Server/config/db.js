const mongoose=require('mongoose')
require('dotenv').config()


const mongoDb=async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoDb is connected ${conn.connection.host}`)
    } catch (error) {
        console.log("mongodb not conncted"+ error)
    }
}

module.exports=mongoDb