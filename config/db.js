const colors=require('colors')
const mongoose=require('mongoose')
// create a function to connect with database

const connectDB=async()=>{
    try{
     await mongoose.connect(process.env.MONGO_URL);
     //if connected successfully
     console.log(`connected to mongodb successfully`.bgGreen.red);
    }catch(error){
        console.log("error to connect mongo db database".bgRed.white);
        console.log(error);
    }
}

module.exports=connectDB;