const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    // validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  isLikedInitially:{
    type: Number,
    default: 0,
  },
  blogs:[
    {
      type:mongoose.Types.ObjectId,
      ref:'Blog'
    }
  ]
  ,
  liked: [  // Adding the 'liked' array
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog'  // You should replace 'SomeOtherModel' with the actual model name you're referring to
    }
  ]
},{timestamps:true});

const userModel=mongoose.model('User',userSchema);
//User collection are created
module.exports=userModel;

// const mongoose = require("mongoose");
// // const validator = require("validator");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const crypto = require("crypto");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Please Enter Your Name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please Enter Your Email"],
//     unique: true,
//     // validate: [validator.isEmail, "Please Enter a valid Email"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please Enter Your Password"],
//   }
// },{timestamps:true});

// const userModel=mongoose.model('User',userSchema);
// //User collection are created
// module.exports=userModel;

// const mongoose = require("mongoose");
// // const validator = require("validator");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const crypto = require("crypto");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Please Enter Your Name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please Enter Your Email"],
//     unique: true,
//     // validate: [validator.isEmail, "Please Enter a valid Email"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please Enter Your Password"],
//   },
//   blogs:[
//     {
//       type:mongoose.Types.ObjectId,
//       ref:'Blog'
//     }
//   ]
// },{timestamps:true});

// const userModel=mongoose.model('User',userSchema);
// //User collection are created
// module.exports=userModel;

// // const mongoose = require("mongoose");
// // // const validator = require("validator");
// // // const bcrypt = require("bcryptjs");
// // // const jwt = require("jsonwebtoken");
// // // const crypto = require("crypto");

// // const userSchema = new mongoose.Schema({
// //   username: {
// //     type: String,
// //     required: [true, "Please Enter Your Name"],
// //   },
// //   email: {
// //     type: String,
// //     required: [true, "Please Enter Your Email"],
// //     unique: true,
// //     // validate: [validator.isEmail, "Please Enter a valid Email"],
// //   },
// //   password: {
// //     type: String,
// //     required: [true, "Please Enter Your Password"],
// //   }
// // },{timestamps:true});

// // const userModel=mongoose.model('User',userSchema);
// // //User collection are created
// // module.exports=userModel;

