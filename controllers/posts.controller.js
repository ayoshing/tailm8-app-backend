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
