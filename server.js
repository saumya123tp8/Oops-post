const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const colors=require('colors')
const dotenv=require('dotenv')
const connectDB = require('./config/db')
////done for deploy

const path=require('path')

////done for deploy
//env config
dotenv.config()
// dotenv.config('address of dotenv file')


//router import
const userRoutes=require('./routes/userRoutes')
const blogRoutes=require('./routes/blogRoutes')
// const userRoutes=import('../routes/userRoutes.js')

//mongodb connection
connectDB();

///rest object created 10:18
const app=express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes 
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/blog',blogRoutes);
// app.get('/',(req,res)=>{
//     res.status(200).send({
//         "message":"node server"
//     })
// })

////done for deploy

//access static file
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

////done for deploy

//listen
const port=(process.env.PORT||8080)
app.listen(port,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
})

