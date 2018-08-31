const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

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
