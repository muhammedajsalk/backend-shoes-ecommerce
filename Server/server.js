const express=require('express')
const app=express()
require('dotenv').config()
const router=require('./Routes/router')
const mongoDb=require('./config/db')

const PORT=process.env.PORT

mongoDb()

app.use(express.json())
app.use(express.urlencoded())
app.use('/api/users',router)

app.listen(PORT,()=>{
    console.log("server is runnig "+PORT)
})