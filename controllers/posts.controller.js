const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");
const validatePostInput = require("../validations/post.validation");

// Public Route: 'api/posts'
exports.getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ notFound: "Did not find any posts" }));
};

// Public Route: 'api/posts/:post_id'
exports.getPost = (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ notFound: "Did not find post for this ID" })
    );
};

// Private Route: '/api/posts'
exports.createPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let postFields = {};

  postFields.user = req.user.id;
  postFields.content = req.body.content;
  postFields.imgUrl = req.body.imgUrl;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      postFields.userName = profile.userName;
      postFields.profile = profile._id;
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
  const errors = {};
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.post_id).then(post => {
      Profile.findOne({ user: post.user })
        .then(posterProfile => {
          if (profile._id.toString() !== posterProfile._id.toString()) {
            throw new Error("Unauthorized");
          } else {
            Post.findOneAndDelete({ _id: req.params.post_id })
              .then(post => res.json(post))
              .catch(err => res.status(404).json({ notFound: "No Post" }));
          }
        })
        .catch(err =>
          res
            .status(401)
            .json({ errors: "Delete failed, post belongs to another user" })
        );
    });
  });
};
