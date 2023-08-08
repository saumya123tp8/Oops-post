const userModel=require('../models/userModel')
const bcrypt=require("bcrypt");


//create/ register user
exports.registerController=async(req,res)=>{
try{
//fetch data from req body
const {username,email,password}=req.body
//validation
if(!username||!email||!password){
    return res.status(400).send({
        message:'please fill all the field',
        success:false,
    })
} 
//check for existing user
const existinguser=await userModel.findOne({email})
if(existinguser){
    return res.status(400).send({
        message:"user with this email is already exist try to login or use another email",
        success:false,
    })
}
//has the password before save
const hassedpassword=await bcrypt.hash(password,10)
//here 10 is the value of salt

///save new user
const user = new userModel({username,email,password:hassedpassword});
await user.save();

return res.status(201).send({
    success:true,
    message:"new user created",
    user,
})
}catch(error){
    console.log(error);
    return res.status(500).send({
        message:"error in register callback",
        success:false,
        error
    })
}
}
//getting all users
exports.getAllUsers=async(req,res)=>{
try{
const users=await userModel.find({});
return res.status(400).send({
    userCount:users.length,
    success:true,
    message:"all users data",
    users

})
}catch(error){
    console.log(error);
    return res.status(200).send({
        success:false,
        message:"error while getting all user",
        error
    })
}
};
//login user
exports.loginController=async(req,res)=>{
try{
 const {email,password}=req.body
 if(!email){
    return res.status(400).send({
        success:false,
        message:"fill the email",
    })
 }
 console.log('email');
 if(!password){
     return res.status(400).send({
         success:false,
         message:"please provide the valid password",
        })
    }
    console.log('password');
    const existing=await userModel.findOne({email})
    if(!existing){
        return res.status(200).send({
            success:false,
            message:"this email is not exist try another"
        })
    }
    console.log('exist');
    const ismatch=await bcrypt.compare(password,existing.password);
    if(!ismatch){
        return res.status(401).send({
            success:false,
            message:"invald email or password"
        })
    }

//     //tony
//     const token = generateToken(user); // Replace with your token generation logic
// res.cookie('authToken', token, { httpOnly: true, secure: true }); // 'secure' flag for HTTPS
//     //tony

    console.log('success');
res.status(200).send({
    success:true,
    message:"login successfull",
    existing
})
}catch(error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"error in login",
        error
    })
}
}