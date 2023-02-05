const router = require("express").Router();
const Comment = require('../models/Comment.model')
const Blog = require('../models/Blog.model');
 
//  POST /api/comment  -  Creates a new comment
router.post('/comment', (req, res, next) => {
  const { comment, blog } = req.body;
  if (comment.trim === "") {
    res.status(400).json({ message: "Provide Comment." });
    return;
}
   Comment.create({comment,blog, OwnerId: req.payload._id })
    .then(newComment => {
      return Blog.findByIdAndUpdate(blog, { $push: { comments: newComment._id } },{ new: true } );

    })
    .then(response => console.log(res.json(response)))
    .catch(err => res.json(err));
});
 
module.exports = router;