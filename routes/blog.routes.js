const express = require("express");
const router = express.Router();
const Blog = require('../models/Blog.model');

// @desc    Get all blogs by user id
// @route   '/api/blogs
// @access  Private

router.get('/blogs/',(req,res) => 
{
        
        Blog.find({user: req.payload._id})
            .then(foundblogs => res.json(foundblogs))
        .catch(err => {
            console.log(err)
            res.json(err)
        })
    
})

//  POST /api/blogs  -  Creates a new blog
router.post('/blogs', (req, res, next) => {
    const { title, content } = req.body;
   
    Blog.create({ title, content, user:req.payload._id })
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });
  

  router.put("/blogs/:blogId", (req, res)=>{
    
    const { title, content } = req.body;
    
    Blog.findOneAndUpdate({ _id: req.params.id, user: req.payload._id }, { title, content }, { new: true })
            .then(updatedBlog => res.json(updatedBlog))
            .catch(err => console.log(err))

})

router.delete("/blogs/:blogId", (req, res)=>{
    /* const { BlogId } = req.params; */
    
    Blog.findOneAndDelete({ _id: req.params.id, user: req.payload._id })
            .then(deletedBlog => res.json(deletedBlog))
            .catch(err => console.log(err))
})

router.get("/blogs/:blogId", (req, res) => {
    /* const { blogId } = req.params; */

    Blog.findOne({ _id: req.params.id, user: req.payload._id })
            .then(foundBlog => res.json(foundBlog))
            .catch(err => console.log(err))
})
module.exports = router;