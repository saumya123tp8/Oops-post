const express=require('express')

const { getAllBlogsController, createBlogController, updateBlogController, deleteBlogController, getBlogByIdController, userBlogControlller, likeController, getLikeController } = require("../controllers/blogController");


const router=express.Router();

//get||all blogs
router.get('/all-blog',getAllBlogsController)

//post||create blog
router.post('/create-blog',createBlogController)

//put || update blog
router.put('/update-blog/:id',updateBlogController);

//delete||delete blog
router.delete('/delete-blog/:id',deleteBlogController)

//get||get single Blog
router.get('/get-blog/:id',getBlogByIdController)

//GET || user blog
router.get("/user-blog/:id", userBlogControlller);

//like blog
router.post(`/like-blog/:id/:userid`,likeController)

// get single blog
// router.get('/uniq/:id',getLikedBlogController);

module.exports=router;