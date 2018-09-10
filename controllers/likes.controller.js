const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

// Public Route: '/api/posts/:post_id/likes'
exports.getPostLikes = (req, res) => {
  Post.findById(req.params.post_id).then(post => {
    res.json(post.likes);
  });
};

// Private Route: '/api/posts/:post_id/likes'
// exports.addLikeToPost = (req, res) => {
//   Profile.findOne({ user: req.user.id }).then(profile => {
//     if (profile) {
//       let likeFields = {};
//       likeFields.user = req.user.id;
//       likeFields.userName = profile.userName;
//
//       Post.findOneAndUpdate(
//         { _id: req.params.post_id },
//         { $push: { likes: likeFields } },
//         { new: true }
//       )
//         .then(post => res.json(post))
//         .catch(err => console.log(err));
//     } else {
//       res.json({ msg: "no profile" });
//     }
//   });
// };

exports.addRemoveLikeToPost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      let likeFields = {};
      likeFields.user = req.user.id;
      likeFields.userName = profile.userName;

      Post.findById(req.params.post_id)
        .then(post => {
          if (post.likes.find(el => el.user.toString() === req.user.id)) {
            let index = post.likes.indexOf(
              post.likes.find(el => el.user.toString() === req.user.id)
            );
            post.likes.splice(index, 1);
          } else {
            post.likes.unshift(likeFields);
          }

          post.save().then(post => res.json(post));
        })

        .catch(err =>
          res.status(404).json({
            msg: "Post not found"
          })
        );
    }
  });
};

exports.removeLikeFromPost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      Post.findOneAndUpdate(
        { _id: req.params.post_id },
        { $pull: { likes: { user: req.user.id } } },
        { new: true }
      )
        .then(post => res.json(post))
        .catch(err => console.log(err));
    } else {
      res.json({ msg: "Profile not found" });
    }
  });
};
