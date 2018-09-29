const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validateCommentInput = require("../validations/comment.validation");

// Public Route: '/api/posts/:post_id/comments'
exports.getPostComments = (req, res) => {
  Post.findById(req.params.post_id).then(post => {
    res.json(post.comments);
  });
};

// Public Route: '/api/posts/:post_id/comments/:comment_id'
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

// Private Route: '/api/posts/:post_id/comments'
exports.addCommentToPost = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      let commentFields = {};
      commentFields.user = req.user.id;
      commentFields.userName = profile.userName;
      commentFields.content = req.body.content;
      commentFields.profile = profile._id;

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

// Private Route: '/api/posts/:post_id/comments/:comment_id'
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
