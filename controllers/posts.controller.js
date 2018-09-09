const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

// Public Route: 'api/posts'
exports.getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ notFound: "No Posts" }));
};

// Public Route: 'api/posts/:post_id'
exports.getPost = (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ notFound: "No Post For This ID" }));
};

// Private Route: '/api/posts'
exports.createPost = (req, res) => {
  let postFields = {};

  postFields.user = req.user.id;
  postFields.content = req.body.content;
  postFields.imgUrl = req.body.imgUrl;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      postFields.userName = profile.userName;
    } else {
      postFields.name = req.user.name;
    }

    new Post(postFields).save().then(post => res.json(post));
  });
};

// Private Route: 'api/posts/:post_id'
exports.updatePost = (req, res) => {
  Post.findById(req.params.post_id).then(post => {
    let postFields = {};

    postFields.content = req.body.content;

    Post.findOneAndUpdate(
      { user: req.user.id },
      { $set: postFields },
      { new: true }
    ).then(post => res.json(post));
  });
};

// Private Route: 'api/posts/:post_id'
exports.deletePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.post_id).then(post => {
      Post.findOneAndDelete({ user: req.user.id })
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ notFound: "No Post" }));
    });
  });
};
