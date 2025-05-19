const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const router=require('./Routes/router')
const mongoDb=require('./config/db')

const PORT=process.env.PORT

mongoDb()




app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/users',router)

app.listen(PORT,()=>{
    console.log("server is runnig "+PORT)
})