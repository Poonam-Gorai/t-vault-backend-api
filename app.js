const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesURls = require('./routes/route')
const cors =  require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,() =>console.log("DataBase connected"))

// app.get('/',(req,res)=>{
//     res.send("we are here")
// })

app.use(express.json())
app.use(cors())
app.use('/',routesURls)
const port = process.env.PORT || 3000;
app.listen(port,() => console.log("server is up and running"))