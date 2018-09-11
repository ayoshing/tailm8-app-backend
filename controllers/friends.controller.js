const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

// Private Route: 'api/profile/friends'
exports.getFriends = (req, res) => {
  let errors = {};
  console.log(req.user.id);
  // Profile.findOne({ user: req.user.id })
  //   .then(profile => {
  //     if (!profile) {
  //       error.noProfile = "You do not have a profile setup";
  //       return res.status(404).json(errors);
  //     }
  //     res.json(profile);
  //   })
  //   .catch(err => res.status(404).json({ friends: "There are no friends" }));
};

exports.addFriend = (req, res) => {};

exports.removeFriend = (req, res) => {};
