const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

// Private Route: 'api/profile/friends'
exports.getFriends = (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "You do not have a profile setup";
        return res.status(404).json(errors);
      }
      res.json(profile.friends);
    })
    .catch(err => res.status(404).json(err));
};

// Private Route: 'api/profile/users/:user_id/friend'
exports.sendFriendRequest = (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        let isFriend = !!profile.friends.find(
          el => el.user.toString() === req.params.user_id
        );

        let friendFields = {};
        friendFields.user = req.params.user_id;
        friendFields.status = "Requested";

        if (!isFriend) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $push: { friends: friendFields } },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        } else {
          res.json(friendFields);
        }
      }
    })
    .catch(err => res.status(404).json(err));
};

// Private Route: 'api/profile/:username/unfriend'
exports.removeFriend = (req, res) => {};
