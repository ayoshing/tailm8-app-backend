const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

// Route '/api/posts/:post_id/comments'
exports.getPostComments = (req, res) => {
  Post.findById(req.params.post_id).then(post => {
    res.json(post.comments);
  });
};

exports.addCommentToPost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      let commentFields = {};
      commentFields.user = req.user.id;
      commentFields.userName = profile.userName;
      commentFields.content = req.body.content;

      Post.findOneAndUpdate(
        { _id: req.params.post_id },
        { $push: { comments: commentFields } },
        { new: true }
      )
        .then(post => res.json(post))
        .catch(err => console.log(err));
    } else {
      res.json({ msg: "no profile" });
    }
  });
};

// Route '/api/posts/:post_id/comments/:comment_id'
exports.getPostComment = (req, res) => {
  Post.findOne({ _id: req.params.post_id })
    .then(post => {
      let userComment = post.comments.find((el, i, arr) => {
        return el._id.toString() === req.params.comment_id;
      });

      res.json(userComment);
    })
    .catch(err => console.log(err));
};

exports.removeCommentFromPost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      Post.findOneAndUpdate(
        { _id: req.params.post_id },
        {
          $pull: { comments: { user: req.user.id, _id: req.params.comment_id } }
        },
        { new: true }
      )
        .then(post => res.json(post))
        .catch(err => console.log(err));
    } else {
      res.json({ msg: "no profile" });
    }
  });
};