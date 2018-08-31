const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

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
