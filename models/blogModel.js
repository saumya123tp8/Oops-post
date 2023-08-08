// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       require: [true, "title is required"],
//     },
//     description: {
//       type: String,
//       required: [true, "description is require"],
//     },
//     image: {
//       type: String,
//       required: [true, "image is require"],
//     },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       require: [true, "user id is required"],
//     },
    
//   },
//   { timestamps: true }
// );

// const blogModel = mongoose.model("Blog", blogSchema);

// module.exports = blogModel;
// // const mongoose=require("mongoose");
// // const blogSchema=new mongoose.Schema({
// //     title:{
// //         type:String,
// //         required:[true,'title of a blog is require']
// //     },
// //     description:{
// //         type:String,
// //         required:[true,'description is require']
// //     },
// //     image:{
// //         type:String,
// //         required:[true,'image is required']
// //     }
// // },{timestamps:true})

// // const blogModel=mongoose.model('Blog',blogSchema);
// // module.exports=blogModel
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    image: {
      type: String,
      required: [true, "image is require"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required"],
    },
    likes:{
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
// const mongoose=require("mongoose");
// const blogSchema=new mongoose.Schema({
//     title:{
//         type:String,
//         required:[true,'title of a blog is require']
//     },
//     description:{
//         type:String,
//         required:[true,'description is require']
//     },
//     image:{
//         type:String,
//         required:[true,'image is required']
//     }
// },{timestamps:true})

// const blogModel=mongoose.model('Blog',blogSchema);
// module.exports=blogModel