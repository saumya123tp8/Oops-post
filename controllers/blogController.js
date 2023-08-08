const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no blog found",
      });
    }
    return res.status(200).send({
      success: true,
      blogCount: blogs.length,
      message: "all blog list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all blogs",
      error,
    });
  }
};

//create blogs
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      if (!user) {
        console.log("user nahi hai");
      }
      return res.status(400).send({
        success: false,
        message: "please provide all field",
      });
    }
    const existinguser = await userModel.findById(user);
    if (!existinguser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existinguser.blogs.push(newBlog);
    await existinguser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "new blog created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in creating blogs",
      error,
    });
  }
};

//update blogs
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "blog successfully updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in updating blogs",
      error,
    });
  }
};

///like blog tony
exports.likeController = async (req, res) => {
  try {
    const { id,userid } = req.params;
    const blog = await blogModel.findById(id);
    const user = await userModel.findById(userid);
    console.log(user)
    console.log(blog)
    if (!blog) {
      return res
        .status(404)
        .send({ success: false, message: "Blog post not found" });
    }
    if (blog?.user) {
      await blog.save();

      if(user.liked.includes(id)){
        blog.likes = blog.likes - 1;
        const index= user.liked.indexOf(id);
        user.liked.splice(index, 1);
        // user.likedblogs.splice()
        await user.save();
        await blog.save();
      }else{
        blog.likes = blog.likes + 1;
        user.liked.push(id);
        await user.save();
        await blog.save();
        }
        return res
          .status(200)
          .send({ success: true, message: "Like updated successfully",user });
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in like the blogs",
      error,
    });
  }
};
//delete blogs
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    //  const blog=await blogModel.findOneAndDelete(id).populate("user")
    await blog.user.blogs.pull(blog);
    ///push and pull is used in array

    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in deleting blogs",
      error,
    });
  }
};

//get single blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userblog = await blogModel.findById(id);
    console.log(userblog)
    if (!userblog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "the blog is here",
      userblog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in geting single blogs",
      error,
    });
  }
};


///
exports.userBlogControlller = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};

// // get Liked Blog Controller
// exports.getLikedBlogController = async (req, res) => {
//   try {
//     const userBlog = await userModel.findById(req.params.id).populate("blogs");

//     if (!userBlog) {
//       return res.status(404).send({
//         success: false,
//         message: "blogs not found with this id",
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       message: "user blogs",
//       userBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "error in user blog",
//       error,
//     });
//   }
// };

// const blogModel=require('../models/blogModel')

// //get all blogs
// exports.getAllBlogsController=async(req,res)=>{
// try{
// const blogs=await blogModel.find({})
// if(!blogs){
//     return res.status(200).send({
//         success:false,
//         message:'no blog found'
//     })
// }
// return res.status(200).send({
//     success:true,
//     blogCount:blogs.length,
//     message:'all blog list',
//     blogs
// })
// }catch(error){
//     console.log(error);
//     return res.status(500).send({
//         success:false,
//         message:'error in get all blogs',
//         error
//     })
// }
// }

// //create blogs
// exports.createBlogController=async(req,res)=>{
//     try{
//        const {title,description,image}=req.body;
//       if(!title||!description||!image){
//         return res.status(400).send({
//             success:false,
//             message:'please provide all field'
//         })
//       }
//       const newBlog=new blogModel({title,description,image});
//       await newBlog.save();
//       return res.status(201).send({
//         success:true,
//         message:'new blog created',
//         newBlog
//       })
// }catch(error){
//     console.log(error);
//     return res.status(500).send({
//         success:false,
//         message:'error in creating blogs',
//         error
//     })
// }
// }

// //update blogs
// exports.updateBlogController=async(req,res)=>{
// try{
//     const {id}=req.params;
// const {title,description,image}=req.body;
// const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
// return res.status(200).send({
//     success:true,
//     message:'blog successfully updated',
//     blog
// })
// }catch(error){
//     console.log(error);
//     return res.status(500).send({
//         success:false,
//         message:'error in updating blogs',
//         error
//     })
// }
// }

// //delete blogs
// exports.deleteBlogController=async(req,res)=>{
// try{
//  const {id}=req.params;
//  await blogModel.findByIdAndDelete(id);
//  return res.status(200).send({
//     success:true,
//     message:'blog deleted successfully',
//  })
// }catch(error){
//     console.log(error);
//     return res.status(500).send({
//         success:false,
//         message:'error in deleting blogs',
//         error
//     })
// }
// }

// //get single blog
// exports.getBlogByIdController=async(req,res)=>{
//     try{
//         const {id}=req.params
//      const blog=await blogModel.findById(id);
//      if(!blog){
//         return res.status(404).send({
//             success:false,
//             message:"blog not found with this id"
//         })
//      }
//      return res.status(200).send({
//         success:true,
//         message:"the blog is here",
//         blog
//     })
//     }catch(error){
//         console.log(error);
//         return res.status(500).send({
//             success:false,
//             message:'error in geting single blogs',
//             error
//         })
//     }
// }
