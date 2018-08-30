const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.test = (req, res) => {
  res.send("works");
};

exports.createPost = (req, res) => {
  let postFields = {};

  postFields.user = req.user.id;
  postFields.content = req.body.content;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      postFields.name = profile.petName;
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
