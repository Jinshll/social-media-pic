const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const Post = mongoose.model('Post');


// get all posts
router.get('/allposts', requireAuth, (req, res) => {
    Post
      .find()                                    // all matching result
      .populate('postedBy', '_id name')          // replace postedBy(only user id) with ref user id, name
      .then(allPosts => res.json({ allPosts }))
      .catch(console.log);
});

// create a new post
router.post('/createpost', requireAuth, (req, res) => {
    const { title, content, imgURL } = req.body;
    if(!title || !content || !imgURL){
        return res.status(422).json({ error: 'Please add some details to the post' }); // Incorrect form submission
    };
    // remove password (when created new post)
    req.user.password = undefined;
    // create new post
    const newPost = new Post({ 
      title, 
      content, 
      photo: imgURL, 
      postedBy: req.user        // req.user － return from requireAuth middleware
    });
    newPost
      .save()
      .then(result =>
        res.status(200).json({ post: result })
      )
      .catch(console.log);
});


// get all the posts created by the user
router.get('/myposts', requireAuth, (req, res) => {
    Post
      .find({ postedBy: req.user._id })
      .populate('postedBy', '_id name')       // replace postedBy(only user id) with user model
      .then(myPosts => res.json({ myPosts }))
      .catch(console.log);
});


module.exports = router;