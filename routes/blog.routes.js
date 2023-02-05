const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Blog = require('../models/Blog.model');
const Comment = require('../models/Comment.model');



/* router.get('/blogs/',(req,res) => 
{
    Blog.find({user: req.payload._id})

       .then(foundblogs => res.json(foundblogs))
       .catch(err => {
            console.log(err)
            res.json(err)
        })
    
}) */

//  POST /api/blogs  -  Creates a new blog
/* router.post('/blogs', (req, res, next) => {

        const { title, content } = req.body;
    // Check if title or content are provided as empty string
        if (title === "" || content === "") {
            res.status(400).json({ message: "Provide Title and Content." });
            return;
        }
   
    Blog.create({ title, content, user:req.payload._id })
      .then((response) => {
        res.status(200).json({message : 'Blog Created Successfully.'})
        //res.json(response)
    }
    
      )
      .catch(err => res.json(err));
  }); */

// @desc    Get all blogs for loggenin user
// @route   '/api/blogs
// @access  Private
 // GET /api/blogs - Returns all the Blogs
router.get('/blogs', (req, res) => {
    Blog.find()
            .populate('comments')
            .then(allBlogs => res.json(allBlogs))
            .catch(err => {
              console.log(err)
              res.json(err)
            })
})


//  POST /api/blogs  -  Creates a new blog
    router.post('/blogs', (req, res, next) => {
        const { title, content } = req.body;
        
        if (title === "" || content === "") {
            res.status(400).json({ message: "Provide Title and Content." });
            return;
        }
        Blog.create({ title, content,user:req.payload._id , comments: [] })
        .then((response) => {
            res.status(200).json({message : 'Blog Created Successfully.'})
            //res.json(response)
        }
        
          )
          .catch(err => res.json(err));
      }); 
  
// PUT  /api/blogs/:blogId - Edit specified blog
  router.put("/blogs/:blogId", (req, res)=>{
    
    const { blogId } = req.params;
    const { title, content,comment } = req.body;
    // Check if title or content are provided as empty string
    if (title === "" || content === "") {
        res.status(400).json({ message: "Provide Title and Content." });
        return;
    }
    Blog.findByIdAndUpdate(blogId , { title, content }, { new: true })
            .then((updatedBlog) => { 
               
                res.status(200).json({message: 'Blog Updated Successfully.'})
            })
            .catch(err => console.log(err))

})

router.delete("/blogs/:blogId", (req, res)=>{
    const { blogId } = req.params; 
    
    Blog.findByIdAndDelete(blogId)
        .then((deletedBlog) => {
            res.status(200).json({message: 'Blog Deleted Successfully.'})
        })
    .catch(err => console.log(err))
})

router.get("/blogs/:blogId", (req, res) => {
     const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Blog.findById( blogId )

        .populate('comments')
        .populate({ 
            path: 'comments',
            populate: {
                path: "OwnerId", // populate property 'user' within property 'reviews'
                model: "User",
            } 
        })
        .then((foundBlog) => { 
            res.json(foundBlog)
        })
        .catch(err => console.log(err))
})
module.exports = router;

