const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.createPost = (req, res) => {
  let postFields = {};

  postFields.user = req.user.id;
  postFields.content = req.body.content;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      postFields.userName = profile.userName;
    } else {
      postFields.name = req.user.name;
    }

    new Post(postFields).save().then(profile => res.json(profile));
  });
};

exports.getPosts = (req, res) => {
  Post.find().then(posts => res.json(posts));
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id).then(post => res.json(post));
};

exports.updatePost = (req, res) => {
  Post.findById(req.params.id).then(post => {
    let postFields = {};

    postFields.content = req.body.content;

    Post.findOneAndUpdate(
      { user: req.user.id },
      { $set: postFields },
      { new: true }
    ).then(post => res.json(post));
  });
};

exports.deletePost = (req, res) => {
  Post.findById(req.params.id).then(post => {
    Post.findOneAndDelete({ user: req.user.id }).then(post => res.json(post));
  });
};

// Likes route functions
exports.getPostLikes = (req, res) => {
  Post.findById(req.params.id).then(post => {
    res.json(post.likes);
  });
};

exports.addLikeToPost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      let likeFields = {};
      likeFields.user = req.user.id;
      likeFields.userName = profile.userName;

      Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: likeFields } },
        { new: true }
      )
        .then(post => res.json(post))
        .catch(err => console.log(err));
    } else {
      res.json({ msg: "user does not have a profile" });
    }
  });
};

exports.removeLikeFromPost = (req, res) => {};

// Comments route functions
exports.getPostComments = (req, res) => {
  Post.findById(req.params.id).then(post => {
    res.json(post.comments);
  });
};

exports.addCommentToPost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      let commentFields = {};
      commentFields.user = req.user.idea;
      commentFields.userName = profile.userName;
      commentFields.content = req.body.content;

      Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: commentFields } },
        { new: true }
      )
        .then(post => res.json(post))
        .catch(err => console.log(err));
    } else {
      res.json({ msg: "user does not have a profile" });
    }
  });
};
