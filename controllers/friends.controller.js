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

// Private Route: 'api/profile/:profile_id/friend'
exports.sendFriendRequest = (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        let isFriend = profile.friends.find(
          el => el.profile.toString() === req.params.profile_id
        );

        console.log(isFriend);

        let friendFields = {};
        friendFields.profile = req.params.profile_id;
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

// Private Route: 'api/profile/profile_id/unfriend'
exports.removeFriend = (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        let isFriend = profile.friends.find(
          el => el.profile.toString() === req.params.profile_id
        );

        if (isFriend) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $pull: { friends: { profile: req.params.profile_id } } },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        } else {
          res.json({ msg: "Already unfriended" });
        }
      }
    })
    .catch(err => res.status(404).json(err));
};
